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
            style: { top: '35%' }
        },
        {
            type: 'source',
            position: Position.Right,
            id: 'false',
            style: { top: '65%' }
        }
    ];

    const getOperatorSymbol = (op) => {
        const symbols = {
            equals: '=',
            not_equals: '≠',
            greater: '>',
            greater_equal: '≥',
            less: '<',
            less_equal: '≤',
            contains: '∋'
        };
        return symbols[op] || '=';
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Condition"
            inputs={inputs}
            outputs={outputs}
            nodeType="condition"
            icon="❓"
        >
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comparison Operator
                    </label>
                    <select
                        value={operator}
                        onChange={handleOperatorChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                                 text-sm bg-white transition-colors duration-200"
                    >
                        <option value="equals">Equals (=)</option>
                        <option value="not_equals">Not Equals (≠)</option>
                        <option value="greater">Greater Than (&gt;)</option>
                        <option value="greater_equal">Greater or Equal (≥)</option>
                        <option value="less">Less Than (&lt;)</option>
                        <option value="less_equal">Less or Equal (≤)</option>
                        <option value="contains">Contains (∋)</option>
                    </select>
                </div>

                <div className="flex items-center justify-center py-2">
                    <div className="text-xl font-bold text-yellow-600 bg-yellow-100 w-10 h-10 
                                  rounded-full flex items-center justify-center border border-yellow-200">
                        {getOperatorSymbol(operator)}
                    </div>
                </div>

                <div className="flex justify-between text-xs">
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-green-700 font-medium">TRUE</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                        <span className="text-red-700 font-medium">FALSE</span>
                    </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Logic:</strong> Compares two input values and routes to TRUE or FALSE output.
                </div>
            </div>
        </BaseNode>
    );
};