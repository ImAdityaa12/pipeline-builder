// apiRequestNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APIRequestNode = ({ id, data }) => {
    const [method, setMethod] = useState(data?.method || 'GET');
    const [url, setUrl] = useState(data?.url || 'https://api.example.com');

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const inputs = [
        {
            type: 'target',
            position: Position.Left,
            id: 'headers'
        },
        {
            type: 'target',
            position: Position.Left,
            id: 'body'
        }
    ];

    const outputs = [
        {
            type: 'source',
            position: Position.Right,
            id: 'response'
        }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="API Request"
            inputs={inputs}
            outputs={outputs}
            height={100}
        >
            <label style={{ display: 'block', marginBottom: '4px' }}>
                Method:
                <select value={method} onChange={handleMethodChange} style={{ marginLeft: '4px' }}>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </label>
            <label style={{ display: 'block' }}>
                URL:
                <input
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    style={{ marginLeft: '4px', width: '120px' }}
                />
            </label>
        </BaseNode>
    );
};