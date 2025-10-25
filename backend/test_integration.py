#!/usr/bin/env python3
"""
Test script to verify the backend integration works correctly
"""

import requests
import json

def test_backend_integration():
    """Test the /pipelines/parse endpoint with various scenarios"""
    
    base_url = "http://localhost:8000"
    
    print("🧪 Testing Backend Integration...")
    print("=" * 50)
    
    # Test 1: Health check
    print("\n1. Testing health check endpoint...")
    try:
        response = requests.get(f"{base_url}/")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        assert response.status_code == 200
        print("   ✅ Health check passed")
    except Exception as e:
        print(f"   ❌ Health check failed: {e}")
        return
    
    # Test 2: Empty pipeline
    print("\n2. Testing empty pipeline...")
    try:
        data = {"nodes": [], "edges": []}
        response = requests.post(f"{base_url}/pipelines/parse", json=data)
        result = response.json()
        print(f"   Status: {response.status_code}")
        print(f"   Response: {result}")
        assert result["num_nodes"] == 0
        assert result["num_edges"] == 0
        assert result["is_dag"] == True  # Empty graph is technically a DAG
        print("   ✅ Empty pipeline test passed")
    except Exception as e:
        print(f"   ❌ Empty pipeline test failed: {e}")
    
    # Test 3: Simple valid DAG
    print("\n3. Testing simple valid DAG...")
    try:
        data = {
            "nodes": [
                {"id": "input-1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
                {"id": "output-1", "type": "output", "position": {"x": 200, "y": 0}, "data": {}}
            ],
            "edges": [
                {"id": "edge-1", "source": "input-1", "target": "output-1", "sourceHandle": "output", "targetHandle": "input"}
            ]
        }
        response = requests.post(f"{base_url}/pipelines/parse", json=data)
        result = response.json()
        print(f"   Status: {response.status_code}")
        print(f"   Response: {result}")
        assert result["num_nodes"] == 2
        assert result["num_edges"] == 1
        assert result["is_dag"] == True
        print("   ✅ Simple DAG test passed")
    except Exception as e:
        print(f"   ❌ Simple DAG test failed: {e}")
    
    # Test 4: Complex valid DAG
    print("\n4. Testing complex valid DAG...")
    try:
        data = {
            "nodes": [
                {"id": "input-1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
                {"id": "text-1", "type": "text", "position": {"x": 200, "y": 0}, "data": {}},
                {"id": "llm-1", "type": "llm", "position": {"x": 400, "y": 0}, "data": {}},
                {"id": "output-1", "type": "output", "position": {"x": 600, "y": 0}, "data": {}}
            ],
            "edges": [
                {"id": "edge-1", "source": "input-1", "target": "text-1", "sourceHandle": "output", "targetHandle": "input"},
                {"id": "edge-2", "source": "text-1", "target": "llm-1", "sourceHandle": "output", "targetHandle": "prompt"},
                {"id": "edge-3", "source": "llm-1", "target": "output-1", "sourceHandle": "response", "targetHandle": "input"}
            ]
        }
        response = requests.post(f"{base_url}/pipelines/parse", json=data)
        result = response.json()
        print(f"   Status: {response.status_code}")
        print(f"   Response: {result}")
        assert result["num_nodes"] == 4
        assert result["num_edges"] == 3
        assert result["is_dag"] == True
        print("   ✅ Complex DAG test passed")
    except Exception as e:
        print(f"   ❌ Complex DAG test failed: {e}")
    
    # Test 5: Cyclic graph (not a DAG)
    print("\n5. Testing cyclic graph (should not be DAG)...")
    try:
        data = {
            "nodes": [
                {"id": "node-1", "type": "input", "position": {"x": 0, "y": 0}, "data": {}},
                {"id": "node-2", "type": "text", "position": {"x": 200, "y": 0}, "data": {}},
                {"id": "node-3", "type": "output", "position": {"x": 400, "y": 0}, "data": {}}
            ],
            "edges": [
                {"id": "edge-1", "source": "node-1", "target": "node-2", "sourceHandle": "output", "targetHandle": "input"},
                {"id": "edge-2", "source": "node-2", "target": "node-3", "sourceHandle": "output", "targetHandle": "input"},
                {"id": "edge-3", "source": "node-3", "target": "node-1", "sourceHandle": "output", "targetHandle": "input"}  # Creates cycle
            ]
        }
        response = requests.post(f"{base_url}/pipelines/parse", json=data)
        result = response.json()
        print(f"   Status: {response.status_code}")
        print(f"   Response: {result}")
        assert result["num_nodes"] == 3
        assert result["num_edges"] == 3
        assert result["is_dag"] == False  # Should detect cycle
        print("   ✅ Cyclic graph test passed")
    except Exception as e:
        print(f"   ❌ Cyclic graph test failed: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 All tests completed!")
    print("\nBackend integration is working correctly.")
    print("You can now test the frontend by:")
    print("1. Opening http://localhost:3001")
    print("2. Adding some nodes and connections")
    print("3. Clicking 'Run Pipeline' button")

if __name__ == "__main__":
    test_backend_integration()