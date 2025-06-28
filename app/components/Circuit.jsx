'use client';

import React, { useState, useEffect } from 'react';
import ReactGridLayout from 'react-grid-layout';
import Operator from './Operator';
import { operators, size, margin } from '../data/operators';

const circuitContainerPadding = { x: 0, y: 0 };
const containerPadding = { x: 10, y: 10 };
const circuitLineMarginL = 40;
const circuitLineMarginR = 50;
const gridDimenY = 3;
const gridDimenX = 10;

export default function Circuit({ droppingItem }) {
  const [layout, setLayout] = useState([]);
  const [droppingItemHeight, setDroppingItemHeight] = useState(1);
  const [draggedItemId, setDraggedItemId] = useState(null);

  useEffect(() => {
    if (!droppingItem) return;
    const op = operators.find(op => op.id === droppingItem);
    if (op) setDroppingItemHeight(op.height || 1);
  }, [droppingItem]);

  const onDrop = (newLayout, layoutItem, event) => {
    event.preventDefault();
    const gateId = event.dataTransfer.getData('gateId');
    const op = operators.find(o => o.id === gateId);
    if (!op) return;

    const newItem = {
      i: new Date().getTime().toString(),
      gateId: gateId,
      x: layoutItem.x,
      y: layoutItem.y,
      w: op.width || 1,
      h: op.height,
      isResizable: false
    };

    const updatedLayout = layout.filter(i => i.i !== '__dropping-elem__');
    updatedLayout.push(newItem);
    setLayout(updatedLayout);
  };

  const handleDragStop = (newLayout) => {
    const updatedLayout = newLayout.map(item => ({
      ...item,
      gateId: layout.find(i => i.i === item.i)?.gateId
    }));
    setLayout(updatedLayout);
    setDraggedItemId(null);
  };

  return (
    <div
      className="relative bg-white border-2 border-gray-200 m-2 shadow-lg rounded-lg"
      style={{
        padding: `${circuitContainerPadding.y}px ${circuitContainerPadding.x}px`,
        width: `${2 * containerPadding.x + gridDimenX * (size + margin.x)}px`,
        height: `${2 * containerPadding.y + gridDimenY * (size + margin.y) - margin.y}px`,
        overflow: 'hidden'
      }}
    >
      <ReactGridLayout
        allowOverlap={false}
        layout={layout}
        cols={gridDimenX}
        containerPadding={[containerPadding.x, containerPadding.y]}
        margin={[margin.x, margin.y]}
        rowHeight={size}
        width={gridDimenX * (size + margin.x)}
        isDroppable
        droppingItem={{ i: '__dropping-elem__', h: droppingItemHeight, w: 1 }}
        onDrop={onDrop}
        onDragStop={handleDragStop}
        onDragStart={(layout, oldItem) => {
          if (oldItem?.i) setDraggedItemId(oldItem.i);
        }}
      >
        {layout.map(item => {
          const op = operators.find(op => op.id === item.gateId);
          if (!op) return null;
          return (
            <div key={item.i} data-grid={item} className="grid-item relative group">
              <Operator
                itemId={item.i}
                symbol={op.icon}
                height={op.height}
                width={op.width}
                fill={op.fill}
                isCustom={op.isCustom}
                components={op.components || []}
              />
            </div>
          );
        })}
      </ReactGridLayout>
    </div>
  );
}
