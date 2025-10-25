// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
    const [operator, setOperator] = useState(data?.operator || 'equals');

    const handleOperatorChange = (e) => {
        setOperator(e.target.value);
    };

    const inputs = [
        {
            type: 'target',
            position: Position.Left,
            id: 'value1'
        },
        {
            type: 'target',
            position: Position.Left,
            id: 'value2'
        }
    ];

    const outputs = [
        {
            type: 'source',
            position: Position.Right,
            id: 'true',
            style: { top: '30%' }
        },
        {
            type: 'source',
            position: Position.Right,
            id: 'false',
            style: { top: '70%' }
        }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Condition"
            inputs={inputs}
            outputs={outputs}
        >
            <label style={{ display: 'block' }}>
                Operator:
                <select value={operator} onChange={handleOperatorChange} style={{ marginLeft: '4px' }}>
                    <option value="equals">Equals</option>
                    <option value="not_equals">Not Equals</option>
                    <option value="greater">Greater Than</option>
                    <option value="less">Less Than</option>
                </select>
            </label>
        </BaseNode>
    );
};