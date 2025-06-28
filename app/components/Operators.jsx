'use client';

import React from 'react';
import { operators, size } from '../data/operators';

export default function Operators({ setDroppingItem }) {
  const onDragStart = (e, gateId, isCustomGate) => {
    setDroppingItem(gateId);
    e.dataTransfer.setData('gateId', gateId);
    e.dataTransfer.setData('isCustomGate', isCustomGate);
  };

  return (
    <div className="flex flex-col p-2">
      <h1 className="font-semibold text-lg">Operators</h1>
      <div className="flex gap-2 flex-row p-2">
        {operators.map((op, index) => (
          <div
            key={index}
            title={op.title}
            draggable
            onDragStart={(e) => onDragStart(e, op.id, op.isCustom)}
            className="flex flex-col items-center cursor-pointer"
          >
            <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg">
              <rect fill={op.fill} height={size} rx="4" width={size} x="0" y="0" />
              {op.icon}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
