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
    >
      <label style={{ display: 'block' }}>
        Text:
        <input
          type="text"
          value={currText}
          onChange={handleTextChange}
          style={{ marginLeft: '4px', width: '120px' }}
        />
      </label>
    </BaseNode>
  );
}
