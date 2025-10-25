// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

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
      title="Text"
      outputs={outputs}
      nodeType="text"
      icon="📝"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Content
          </label>
          <textarea
            value={currText}
            onChange={handleTextChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     text-sm transition-colors duration-200 resize-none"
            placeholder="Enter text content or use {{variable}} syntax"
          />
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <strong>Tip:</strong> Use <code className="bg-gray-200 px-1 rounded">{'{{variable}}'}</code> to reference other nodes
        </div>
      </div>
    </BaseNode>
  );
}
