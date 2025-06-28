// ✅ Enhanced Operator.js with XRay View rendering logic
'use client';

import React, { useState } from 'react';

// Local constants for grid sizing
export const size = 40;
export const margin = { x: 10, y: 10 };

import { operators } from '../data/operators.jsx';
import { Eye } from 'lucide-react';

export default function Operator({ title, itemId, fill, height, width, components = [], isCustom, symbol, style = {} }) {
    const [isXRayMode, setIsXRayMode] = useState(false);

    const xExtent = isXRayMode && components.length > 0
        ? Math.max(...components.map(c => c.x + c.w)) - Math.min(...components.map(c => c.x))
        : 1;
    const yExtent = isXRayMode && components.length > 0
        ? Math.max(...components.map(c => c.y + c.h)) - Math.min(...components.map(c => c.y))
        : height;

    return (
        <div style={{ ...style, position: 'relative' }} className="group">
            <svg
                className={`z-40 absolute top-0 left-0 ${isXRayMode ? 'scale-95' : ''}`}
                height={yExtent * size + margin.y * (yExtent - 1)}
                width={xExtent * size + margin.x * (xExtent - 1)}
                overflow="visible"
                xmlns="http://www.w3.org/2000/svg"
            >
                {!isXRayMode && (
                    <>
                        <rect
                            fill={fill}
                            height={height * size + (height - 1) * margin.y}
                            rx="4"
                            width={size}
                            x="0"
                            y="0"
                        />
                        {symbol}
                    </>
                )}

                {isXRayMode && components.map((comp, idx) => {
                    const op = operators.find(op => op.id === comp.gateId);
                    return (
                        <g key={idx} transform={`translate(${comp.x * (size + margin.x)}, ${comp.y * (size + margin.y)})`}>
                            <rect
                                fill={op?.fill || 'gray'}
                                height={size}
                                rx="4"
                                width={size}
                            />
                            {op?.icon || null}
                        </g>
                    );
                })}
            </svg>

            {isCustom && (
                <button
                    aria-label="Toggle X-Ray Mode"
                    className="absolute top-1 right-1 bg-white border border-gray-300 rounded-full shadow hidden group-hover:block"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsXRayMode(!isXRayMode);
                    }}
                    style={{ width: 18, height: 18, minWidth: 0, padding: 0, zIndex: 100 }}
                >
                    <Eye size={14} color={isXRayMode ? 'lightblue' : 'black'} />
                </button>
            )}
        </div>
    );
}
