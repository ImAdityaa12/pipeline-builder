from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class NodeData(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class EdgeData(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineData(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]

class PipelineAnalysis(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse', response_model=PipelineAnalysis)
def parse_pipeline(pipeline: PipelineData):
    """
    Analyze a pipeline to count nodes/edges and check if it's a valid DAG
    """
    try:
        # Count nodes and edges
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Create a directed graph using NetworkX
        G = nx.DiGraph()
        
        # Add nodes to the graph
        for node in pipeline.nodes:
            G.add_node(node.id, **node.data)
        
        # Add edges to the graph
        for edge in pipeline.edges:
            G.add_edge(edge.source, edge.target)
        
        # Check if the graph is a Directed Acyclic Graph (DAG)
        is_dag = nx.is_directed_acyclic_graph(G)
        
        return PipelineAnalysis(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag
        )
        
    except Exception as e:
        # In case of any error, return basic counts and assume not a DAG
        return PipelineAnalysis(
            num_nodes=len(pipeline.nodes) if pipeline.nodes else 0,
            num_edges=len(pipeline.edges) if pipeline.edges else 0,
            is_dag=False
        )
