// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const nodeCategories = [
        {
            title: 'Input/Output',
            nodes: [
                { type: 'customInput', label: 'Input', icon: '📥', description: 'Data input source' },
                { type: 'customOutput', label: 'Output', icon: '📤', description: 'Data output destination' }
            ]
        },
        {
            title: 'Processing',
            nodes: [
                { type: 'llm', label: 'LLM', icon: '🤖', description: 'Large Language Model' },
                { type: 'text', label: 'Text', icon: '📝', description: 'Text processing & templates' },
                { type: 'math', label: 'Math', icon: '🔢', description: 'Mathematical operations' },
                { type: 'transform', label: 'Transform', icon: '🔄', description: 'Data transformation' }
            ]
        },
        {
            title: 'Logic & Data',
            nodes: [
                { type: 'condition', label: 'Condition', icon: '❓', description: 'Conditional logic' },
                { type: 'filter', label: 'Filter', icon: '🔍', description: 'Data filtering' },
                { type: 'apiRequest', label: 'API Request', icon: '🌐', description: 'HTTP API calls' }
            ]
        }
    ];

    return (
        <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">Node Library</h2>
                </div>
                <p className="text-sm text-gray-600">Drag nodes to the canvas to build your pipeline</p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                    {nodeCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="rounded-lg border border-gray-200 p-4 bg-white">
                            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                                {category.title}
                                <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                    {category.nodes.length}
                                </span>
                            </h3>
                            <div className="space-y-2">
                                {category.nodes.map((node) => (
                                    <div key={node.type} className="w-full">
                                        <DraggableNode
                                            type={node.type}
                                            label={node.label}
                                            icon={node.icon}
                                            description={node.description}
                                            sidebar={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 mt-4">
                    <div className="text-xs text-gray-500 space-y-1">
                        <p><strong>Tip:</strong> Drag nodes from here to the canvas</p>
                        <p><strong>Connect:</strong> Drag from output handles to input handles</p>
                        <p><strong>Delete:</strong> Select a node and press Delete key</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
