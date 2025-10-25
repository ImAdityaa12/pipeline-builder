// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const inputs = [
    {
      type: 'target',
      position: Position.Left,
      id: 'system'
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'prompt'
    }
  ];

  const outputs = [
    {
      type: 'source',
      position: Position.Right,
      id: 'response'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={inputs}
      outputs={outputs}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
}
