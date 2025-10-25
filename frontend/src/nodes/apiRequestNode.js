// apiRequestNode.js

import { useState, useEffect, useRef, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APIRequestNode = ({ id, data }) => {
    const [method, setMethod] = useState(data?.method || 'GET');
    const [url, setUrl] = useState(data?.url || 'https://api.example.com');
    const [timeout, setTimeout] = useState(data?.timeout || 30);
    const [retries, setRetries] = useState(data?.retries || 0);
    const [nodeHeight, setNodeHeight] = useState('auto');
    const contentRef = useRef(null);

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
    };

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleTimeoutChange = (e) => {
        setTimeout(parseInt(e.target.value) || 30);
    };

    const handleRetriesChange = (e) => {
        setRetries(parseInt(e.target.value) || 0);
    };

    // Auto-resize node based on content
    const autoResize = useCallback(() => {
        setTimeout(() => {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                const headerHeight = 50; // Title bar height
                const padding = 32; // Content padding (p-4)
                const totalHeight = headerHeight + contentHeight + padding + 10; // Add buffer

                setNodeHeight(Math.max(totalHeight, 220)); // Minimum height for API request node
            }
        }, 50);
    }, []);

    // Resize when content changes
    useEffect(() => {
        autoResize();
    }, [method, url, timeout, retries, autoResize]);

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
            id: 'headers'
        },
        {
            type: 'target',
            position: Position.Left,
            id: 'body'
        }
    ];

    const outputs = [
        {
            type: 'source',
            position: Position.Right,
            id: 'response'
        },
        {
            type: 'source',
            position: Position.Right,
            id: 'status'
        }
    ];

    const getMethodColor = (method) => {
        const colors = {
            GET: 'bg-green-100 text-green-800 border-green-200',
            POST: 'bg-blue-100 text-blue-800 border-blue-200',
            PUT: 'bg-orange-100 text-orange-800 border-orange-200',
            DELETE: 'bg-red-100 text-red-800 border-red-200',
            PATCH: 'bg-purple-100 text-purple-800 border-purple-200'
        };
        return colors[method] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <BaseNode
            id={id}
            data={data}
            title="API Request"
            inputs={inputs}
            outputs={outputs}
            nodeType="apiRequest"
            icon="🌐"
            height={nodeHeight}
            width={350}
        >
            <div ref={contentRef} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Method
                        </label>
                        <select
                            value={method}
                            onChange={handleMethodChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
                                     text-sm bg-white transition-colors duration-200"
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                            <option value="PATCH">PATCH</option>
                            <option value="HEAD">HEAD</option>
                            <option value="OPTIONS">OPTIONS</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getMethodColor(method)}`}>
                            {method}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL Endpoint
                    </label>
                    <input
                        type="url"
                        value={url}
                        onChange={handleUrlChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
                                 text-sm transition-colors duration-200"
                        placeholder="https://api.example.com/endpoint"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Timeout (seconds)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="300"
                            value={timeout}
                            onChange={handleTimeoutChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
                                     text-sm transition-colors duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Retries
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            value={retries}
                            onChange={handleRetriesChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
                                     text-sm transition-colors duration-200"
                        />
                    </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    <strong>Inputs:</strong> Connect headers and body data.
                    <strong>Outputs:</strong> Response data and HTTP status code.
                </div>
            </div>
        </BaseNode>
    );
};