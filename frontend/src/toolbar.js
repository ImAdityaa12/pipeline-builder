// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const nodeCategories = [
        {
            title: 'Input/Output',
            nodes: [
                { type: 'customInput', label: 'Input', icon: '📥' },
                { type: 'customOutput', label: 'Output', icon: '📤' }
            ]
        },
        {
            title: 'Processing',
            nodes: [
                { type: 'llm', label: 'LLM', icon: '🤖' },
                { type: 'text', label: 'Text', icon: '📝' },
                { type: 'math', label: 'Math', icon: '🔢' },
                { type: 'transform', label: 'Transform', icon: '🔄' }
            ]
        },
        {
            title: 'Logic & Data',
            nodes: [
                { type: 'condition', label: 'Condition', icon: '❓' },
                { type: 'filter', label: 'Filter', icon: '🔍' },
                { type: 'apiRequest', label: 'API Request', icon: '🌐' }
            ]
        }
    ];

    return (
        <div className="px-6 py-4">
            <div className="flex items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Node Library</h2>
                <span className="ml-2 text-sm text-gray-500">Drag to add nodes</span>
            </div>

            <div className="space-y-6">
                {nodeCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                        <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {category.nodes.map((node) => (
                                <DraggableNode
                                    key={node.type}
                                    type={node.type}
                                    label={node.label}
                                    icon={node.icon}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
