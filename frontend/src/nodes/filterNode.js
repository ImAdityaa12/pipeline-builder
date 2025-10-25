// filterNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const [filterType, setFilterType] = useState(data?.filterType || 'contains');
    const [filterValue, setFilterValue] = useState(data?.filterValue || '');

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleFilterValueChange = (e) => {
        setFilterValue(e.target.value);
    };

    const inputs = [
        {
            type: 'target',
            position: Position.Left,
            id: 'data'
        }
    ];

    const outputs = [
        {
            type: 'source',
            position: Position.Right,
            id: 'filtered'
        }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Filter"
            inputs={inputs}
            outputs={outputs}
            height={100}
        >
            <label style={{ display: 'block', marginBottom: '4px' }}>
                Type:
                <select value={filterType} onChange={handleFilterTypeChange} style={{ marginLeft: '4px' }}>
                    <option value="contains">Contains</option>
                    <option value="starts_with">Starts With</option>
                    <option value="ends_with">Ends With</option>
                    <option value="regex">Regex</option>
                </select>
            </label>
            <label style={{ display: 'block' }}>
                Value:
                <input
                    type="text"
                    value={filterValue}
                    onChange={handleFilterValueChange}
                    style={{ marginLeft: '4px', width: '100px' }}
                />
            </label>
        </BaseNode>
    );
};