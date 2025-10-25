// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const inputs = [
    {
      type: 'target',
      position: Position.Left,
      id: 'value'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={inputs}
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
        <select value={outputType} onChange={handleTypeChange} style={{ marginLeft: '4px' }}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}
