// mathNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
    const [operation, setOperation] = useState(data?.operation || 'add');

    const handleOperationChange = (e) => {
        setOperation(e.target.value);
    };

    const inputs = [
        {
            type: 'target',
            position: Position.Left,
            id: 'a'
        },
        {
            type: 'target',
            position: Position.Left,
            id: 'b'
        }
    ];

    const outputs = [
        {
            type: 'source',
            position: Position.Right,
            id: 'result'
        }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Math"
            inputs={inputs}
            outputs={outputs}
        >
            <label style={{ display: 'block' }}>
                Operation:
                <select value={operation} onChange={handleOperationChange} style={{ marginLeft: '4px' }}>
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                    <option value="multiply">Multiply</option>
                    <option value="divide">Divide</option>
                </select>
            </label>
        </BaseNode>
    );
};