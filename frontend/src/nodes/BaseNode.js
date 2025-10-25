// BaseNode.js

import { Handle } from 'reactflow';

export const BaseNode = ({
    id,
    data,
    title,
    inputs = [],
    outputs = [],
    children,
    width = 200,
    height = 80,
    style = {}
}) => {
    const defaultStyle = {
        width,
        height,
        border: '1px solid black',
        padding: '8px',
        backgroundColor: 'white',
        borderRadius: '4px',
        ...style
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
                style={{ ...positionStyle, ...handleStyle }}
            />
        );
    };

    return (
        <div style={defaultStyle}>
            {/* Render input handles */}
            {inputs.map((input, index) => renderHandle(input, index, inputs.length))}

            {/* Node header */}
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                <span>{title}</span>
            </div>

            {/* Node content */}
            <div>
                {children}
            </div>

            {/* Render output handles */}
            {outputs.map((output, index) => renderHandle(output, index, outputs.length))}
        </div>
    );
};