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

    const getTransformationExample = (transform) => {
        const examples = {
            uppercase: '"hello" → "HELLO"',
            lowercase: '"HELLO" → "hello"',
            trim: '" hello " → "hello"',
            reverse: '"hello" → "olleh"',
            length: '"hello" → 5',
            capitalize: '"hello world" → "Hello World"',
            snake_case: '"Hello World" → "hello_world"',
            camel_case: '"hello world" → "helloWorld"',
            slug: '"Hello World!" → "hello-world"'
        };
        return examples[transform] || '';
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="Transform"
            inputs={inputs}
            outputs={outputs}
            nodeType="transform"
            icon="🔄"
        >
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transformation Type
                    </label>
                    <select
                        value={transformation}
                        onChange={handleTransformationChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                                 text-sm bg-white transition-colors duration-200"
                    >
                        <option value="uppercase">Uppercase</option>
                        <option value="lowercase">Lowercase</option>
                        <option value="capitalize">Capitalize Words</option>
                        <option value="trim">Trim Whitespace</option>
                        <option value="reverse">Reverse String</option>
                        <option value="length">Get Length</option>
                        <option value="snake_case">Snake Case</option>
                        <option value="camel_case">Camel Case</option>
                        <option value="slug">URL Slug</option>
                    </select>
                </div>

                <div className="bg-indigo-50 p-2 rounded border border-indigo-200">
                    <div className="text-xs font-medium text-indigo-800 mb-1">Example:</div>
                    <div className="text-xs text-indigo-700 font-mono">
                        {getTransformationExample(transformation)}
                    </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Function:</strong> Applies the selected transformation to input data.
                </div>
            </div>
        </BaseNode>
    );
};