// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const [transformation, setTransformation] = useState(data?.transformation || 'uppercase');

    const handleTransformationChange = (e) => {
        setTransformation(e.target.value);
    };

    const inputs = [
        {
            type: 'target',
            position: Position.Left,
            id: 'input'
        }
    ];

    const outputs = [
        {
            type: 'source',
            position: Position.Right,
            id: 'output'
        }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Transform"
            inputs={inputs}
            outputs={outputs}
        >
            <label style={{ display: 'block' }}>
                Transform:
                <select value={transformation} onChange={handleTransformationChange} style={{ marginLeft: '4px' }}>
                    <option value="uppercase">Uppercase</option>
                    <option value="lowercase">Lowercase</option>
                    <option value="trim">Trim</option>
                    <option value="reverse">Reverse</option>
                    <option value="length">Length</option>
                </select>
            </label>
        </BaseNode>
    );
};