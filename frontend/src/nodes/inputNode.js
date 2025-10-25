// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const outputs = [
    {
      type: 'source',
      position: Position.Right,
      id: 'value'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={outputs}
    >
      <label style={{ display: 'block', marginBottom: '4px' }}>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{ marginLeft: '4px', width: '100px' }}
        />
      </label>
      <label style={{ display: 'block' }}>
        Type:
        <select value={inputType} onChange={handleTypeChange} style={{ marginLeft: '4px' }}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}
