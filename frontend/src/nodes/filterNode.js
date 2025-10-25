// filterNode.js

import { useState, useEffect, useRef, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const [filterType, setFilterType] = useState(data?.filterType || 'contains');
    const [filterValue, setFilterValue] = useState(data?.filterValue || '');
    const [nodeHeight, setNodeHeight] = useState('auto');
    const contentRef = useRef(null);

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleFilterValueChange = (e) => {
        setFilterValue(e.target.value);
    };

    // Auto-resize node based on content
    const autoResize = useCallback(() => {
        setTimeout(() => {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                const headerHeight = 50; // Title bar height
                const padding = 32; // Content padding (p-4)
                const totalHeight = headerHeight + contentHeight + padding + 10; // Add buffer

                setNodeHeight(Math.max(totalHeight, 180)); // Minimum height for filter node
            }
        }, 50);
    }, []);

    // Resize when content changes
    useEffect(() => {
        autoResize();
    }, [filterType, filterValue, autoResize]);

    // Initial resize on mount
    useEffect(() => {
        autoResize();
    }, [autoResize]);

    // Set up ResizeObserver for accurate height tracking
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

    const inputs = [
        {
            type: 'target',
            position: Position.Left,
            id: 'data'
        }
    ];

    const outputs = [
        {
            type: 'source',
            position: Position.Right,
            id: 'filtered'
        }
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="Filter"
            inputs={inputs}
            outputs={outputs}
            nodeType="filter"
            icon="🔍"
            height={nodeHeight}
        >
            <div ref={contentRef} className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Filter Type
                    </label>
                    <select
                        value={filterType}
                        onChange={handleFilterTypeChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                                 text-sm bg-white transition-colors duration-200"
                    >
                        <option value="contains">Contains</option>
                        <option value="starts_with">Starts With</option>
                        <option value="ends_with">Ends With</option>
                        <option value="equals">Equals</option>
                        <option value="not_equals">Not Equals</option>
                        <option value="regex">Regex Pattern</option>
                        <option value="greater_than">Greater Than</option>
                        <option value="less_than">Less Than</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Filter Value
                    </label>
                    <input
                        type="text"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                                 text-sm transition-colors duration-200"
                        placeholder="Enter filter value or pattern"
                    />
                </div>

                {filterType === 'regex' && (
                    <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-200">
                        <strong>Regex Mode:</strong> Use JavaScript regex syntax.
                        Example: <code className="bg-yellow-100 px-1 rounded">^[A-Z].*</code> for strings starting with uppercase.
                    </div>
                )}

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Tip:</strong> Filter will process input data and output only items matching the criteria.
                </div>
            </div>
        </BaseNode>
    );
};