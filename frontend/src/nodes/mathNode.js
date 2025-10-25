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

    const getOperationSymbol = (op) => {
        const symbols = {
            add: '+',
            subtract: '−',
            multiply: '×',
            divide: '÷',
            power: '^',
            modulo: '%'
        };
        return symbols[op] || '+';
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Math"
            inputs={inputs}
            outputs={outputs}
            nodeType="math"
            icon="🔢"
        >
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Operation
                    </label>
                    <select
                        value={operation}
                        onChange={handleOperationChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                                 text-sm bg-white transition-colors duration-200"
                    >
                        <option value="add">Add (+)</option>
                        <option value="subtract">Subtract (−)</option>
                        <option value="multiply">Multiply (×)</option>
                        <option value="divide">Divide (÷)</option>
                        <option value="power">Power (^)</option>
                        <option value="modulo">Modulo (%)</option>
                    </select>
                </div>

                <div className="flex items-center justify-center py-2">
                    <div className="text-2xl font-bold text-orange-600 bg-orange-100 w-10 h-10 
                                  rounded-full flex items-center justify-center border border-orange-200">
                        {getOperationSymbol(operation)}
                    </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Inputs:</strong> Connect numeric values to ports A and B.
                </div>
            </div>
        </BaseNode>
    );
};