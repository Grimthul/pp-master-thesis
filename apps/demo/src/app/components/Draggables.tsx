import * as React from 'react';

import { DraggableSvg } from './DraggableSvg';

import { ADD_ELEMENT_SIZE, ID_DROPPABLE } from '@pp-master-thesis/constants';

import './Draggables.scss';

export const Draggables = ({
  dragImageRef,
}: {
  dragImageRef?: React.RefObject<HTMLDivElement>;
}) => {
  const DraggableSvgWithAttrs = ({
    children,
  }: {
    children: React.ReactElement;
  }) => (
    <DraggableSvg dragImageRef={dragImageRef} onDragOffTargetId={ID_DROPPABLE}>
      {children}
    </DraggableSvg>
  );

  return (
    <div className="draggables">
      <DraggableSvgWithAttrs>
        <svg
          id="add-circle"
          className="draggable__svg"
          viewBox="-1 -1 41 41"
          width={ADD_ELEMENT_SIZE + 2}
          height={ADD_ELEMENT_SIZE + 2}
        >
          <circle
            cx={ADD_ELEMENT_SIZE / 2}
            cy={ADD_ELEMENT_SIZE / 2}
            r={ADD_ELEMENT_SIZE / 2 - 0.5}
            stroke="#000000"
            fill="none"
          />
        </svg>
      </DraggableSvgWithAttrs>
      <DraggableSvgWithAttrs>
        <svg id="add-rectangle" className="draggable__svg">
          <rect
            width={ADD_ELEMENT_SIZE}
            height={ADD_ELEMENT_SIZE}
            stroke="#000000"
            fill="none"
          />
        </svg>
      </DraggableSvgWithAttrs>
      <DraggableSvgWithAttrs>
        <svg
          id="add-ellipse"
          className="draggable__svg"
          viewBox="-1 -1 41 22"
          width={ADD_ELEMENT_SIZE + 2}
          height={ADD_ELEMENT_SIZE / 2 + 2}
        >
          <ellipse
            cx={ADD_ELEMENT_SIZE / 2}
            cy={ADD_ELEMENT_SIZE / 4}
            rx={ADD_ELEMENT_SIZE / 2}
            ry={ADD_ELEMENT_SIZE / 4}
            stroke="#000000"
            fill="none"
          />
        </svg>
      </DraggableSvgWithAttrs>
      <DraggableSvgWithAttrs>
        <svg id="add-path" className="draggable__svg">
          <path
            d={`M 0 ${ADD_ELEMENT_SIZE} L ${ADD_ELEMENT_SIZE} 0`}
            stroke="#000000"
            fill="none"
          />
        </svg>
      </DraggableSvgWithAttrs>
    </div>
  );
};
