// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges
    }));

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            alert('Please add some nodes to the pipeline before submitting.');
            return;
        }

        setIsLoading(true);

        try {
            // Prepare the pipeline data
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    position: node.position,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle,
                    targetHandle: edge.targetHandle
                }))
            };

            console.log('Submitting pipeline data:', pipelineData);

            // Send POST request to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Backend response:', result);

            // Show alert with the results
            alert(`Pipeline Analysis Results:
            
Number of Nodes: ${result.num_nodes}
Number of Edges: ${result.num_edges}
Is Valid DAG: ${result.is_dag ? 'Yes' : 'No'}

${result.is_dag ? '✅ Your pipeline is a valid Directed Acyclic Graph!' : '❌ Warning: Your pipeline contains cycles and is not a valid DAG.'}`);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error submitting pipeline: ${error.message}\n\nPlease make sure the backend server is running on http://localhost:8000`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-2.5 border border-transparent 
                     text-sm font-medium rounded-lg shadow-sm text-white 
                     bg-gradient-to-r from-primary-600 to-primary-700 
                     hover:from-primary-700 hover:to-primary-800 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                     transform transition-all duration-200 hover:scale-105 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <>
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                </>
            ) : (
                <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Run Pipeline
                </>
            )}
        </button>
    );
}
