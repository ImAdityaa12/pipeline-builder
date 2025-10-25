// BaseNode.js

import { Handle } from 'reactflow';

export const BaseNode = ({
    id,
    data,
    title,
    inputs = [],
    outputs = [],
    children,
    width = 280,
    height = 'auto',
    nodeType = 'default',
    icon = null
}) => {
    const getNodeColor = (type) => {
        const colorMap = {
            customInput: 'border-green-400 bg-gradient-to-br from-green-50 to-green-100',
            customOutput: 'border-red-400 bg-gradient-to-br from-red-50 to-red-100',
            llm: 'border-purple-400 bg-gradient-to-br from-purple-50 to-purple-100',
            text: 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100',
            math: 'border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100',
            transform: 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-indigo-100',
            condition: 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100',
            filter: 'border-teal-400 bg-gradient-to-br from-teal-50 to-teal-100',
            apiRequest: 'border-cyan-400 bg-gradient-to-br from-cyan-50 to-cyan-100',
        };
        return colorMap[type] || 'border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100';
    };

    const getHeaderColor = (type) => {
        const colorMap = {
            customInput: 'text-green-800 bg-green-200',
            customOutput: 'text-red-800 bg-red-200',
            llm: 'text-purple-800 bg-purple-200',
            text: 'text-blue-800 bg-blue-200',
            math: 'text-orange-800 bg-orange-200',
            transform: 'text-indigo-800 bg-indigo-200',
            condition: 'text-yellow-800 bg-yellow-200',
            filter: 'text-teal-800 bg-teal-200',
            apiRequest: 'text-cyan-800 bg-cyan-200',
        };
        return colorMap[type] || 'text-gray-800 bg-gray-200';
    };

    const renderHandle = (handle, index, totalHandles) => {
        const { type, position, id: handleId, style: handleStyle = {} } = handle;

        // Calculate position for multiple handles
        let positionStyle = {};
        if (totalHandles > 1) {
            const spacing = 100 / (totalHandles + 1);
            positionStyle = { top: `${spacing * (index + 1)}%` };
        }

        return (
            <Handle
                key={`${id}-${handleId}`}
                type={type}
                position={position}
                id={`${id}-${handleId}`}
                className="w-3 h-3 border-2 border-white bg-primary-500 hover:bg-primary-600 transition-all duration-200"
                style={{ ...positionStyle, ...handleStyle }}
            />
        );
    };

    return (
        <div
            className={`min-w-[${width}px] bg-white border-2 rounded-xl shadow-node hover:shadow-node-hover 
                       transition-all duration-200 overflow-hidden ${getNodeColor(nodeType)}`}
            style={{ width: width === 'auto' ? 'auto' : width }}
        >
            {/* Render input handles */}
            {inputs.map((input, index) => renderHandle(input, index, inputs.length))}

            {/* Node header */}
            <div className={`px-4 py-2 ${getHeaderColor(nodeType)} border-b border-white/50`}>
                <div className="flex items-center space-x-2">
                    {icon && (
                        <span className="text-lg" role="img" aria-label={title}>
                            {icon}
                        </span>
                    )}
                    <span className="font-semibold text-sm uppercase tracking-wide">
                        {title}
                    </span>
                </div>
            </div>

            {/* Node content */}
            <div className="p-4">
                {children}
            </div>

            {/* Render output handles */}
            {outputs.map((output, index) => renderHandle(output, index, outputs.length))}
        </div>
    );
};