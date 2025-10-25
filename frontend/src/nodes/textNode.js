// textNode.js

import { useState, useEffect, useRef, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [detectedVariables, setDetectedVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(320);
  const [nodeHeight, setNodeHeight] = useState('auto');
  const textareaRef = useRef(null);
  const contentRef = useRef(null);

  // Function to detect variables in double curly braces
  const detectVariables = (text) => {
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const variables = [];
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
      const variableName = match[1].trim();
      if (variableName && !variables.includes(variableName)) {
        variables.push(variableName);
      }
    }

    return variables;
  };

  // Auto-resize textarea and node based on content
  const autoResize = useCallback(() => {
    if (textareaRef.current && contentRef.current) {
      const textarea = textareaRef.current;

      // Reset height to get accurate scrollHeight
      textarea.style.height = 'auto';

      // Calculate textarea dimensions
      const textareaHeight = Math.max(60, textarea.scrollHeight);
      const longestLine = Math.max(...currText.split('\n').map(line => line.length));

      // Adjust width based on content length (minimum 320px, maximum 600px)
      const newWidth = Math.min(600, Math.max(320, longestLine * 8 + 100));

      // Set textarea height
      textarea.style.height = `${textareaHeight}px`;
      setNodeWidth(newWidth);

      // Use a more accurate approach: measure actual content height
      setTimeout(() => {
        if (contentRef.current) {
          const contentHeight = contentRef.current.scrollHeight;
          const headerHeight = 50; // Title bar height
          const padding = 32; // Content padding (p-4)
          const totalHeight = headerHeight + contentHeight + padding + 10; // Add buffer

          setNodeHeight(Math.max(totalHeight, 200)); // Minimum height of 200px
        }
      }, 50); // Slightly longer delay to ensure all content is rendered
    }
  }, [currText]);

  // Update variables and resize when text changes
  useEffect(() => {
    const variables = detectVariables(currText);
    setDetectedVariables(variables);

    // Auto-resize after state update
    setTimeout(autoResize, 0);
  }, [currText, autoResize]);

  // Initial resize on mount
  useEffect(() => {
    autoResize();
  }, [autoResize]);

  // Resize when variables change (affects height calculation)
  useEffect(() => {
    setTimeout(autoResize, 0);
  }, [detectedVariables, autoResize]);

  // Set up ResizeObserver for more accurate height tracking
  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setTimeout(autoResize, 10);
      });

      resizeObserver.observe(contentRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [autoResize]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create dynamic input handles based on detected variables
  const inputs = detectedVariables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: variable,
    style: {
      top: `${50 + (index * 30)}px`, // Distribute handles vertically with more spacing
    }
  }));

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
      inputs={inputs}
      outputs={outputs}
      nodeType="text"
      icon="📝"
      width={nodeWidth}
      height={nodeHeight}
    >
      <div ref={contentRef} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Content
          </label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     text-sm transition-colors duration-200 resize-none overflow-hidden"
            placeholder="Enter text content or use {{variable}} syntax"
            style={{ minHeight: '60px' }}
          />
        </div>

        {/* Display detected variables */}
        {detectedVariables.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Detected Variables ({detectedVariables.length}):
            </label>
            <div className="flex flex-wrap gap-1">
              {detectedVariables.map((variable, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium 
                           bg-blue-100 text-blue-800 rounded-full border border-blue-200"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                  {variable}
                </span>
              ))}
            </div>

            {/* Preview of processed text */}
            <div className="mt-2 p-2 bg-gray-50 rounded border text-xs">
              <div className="font-medium text-gray-600 mb-1">Preview:</div>
              <div className="text-gray-800 font-mono">
                {currText.replace(/\{\{([^}]+)\}\}/g, (_, variable) =>
                  `[${variable.trim()}]`
                )}
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <strong>Tip:</strong> Use <code className="bg-gray-200 px-1 rounded">{'{{variable}}'}</code> to reference other nodes.
          Variables will automatically create input handles.
        </div>
      </div>
    </BaseNode>
  );
}
