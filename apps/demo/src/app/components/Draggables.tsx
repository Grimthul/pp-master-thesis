import * as React from 'react';

import { DraggableSvg } from './DraggableSvg';

import './Draggables.scss';

const ELEMENT_SIZE = 40;

export const Draggables = ({
  dragImageRef,
}: {
  dragImageRef?: React.RefObject<HTMLDivElement>;
}) => {
  const DraggableSvgWithAttrs = ({
    children,
  }: {
    children: React.ReactElement;
  }) => <DraggableSvg dragImageRef={dragImageRef}>{children}</DraggableSvg>;

  return (
    <div className="draggables">
      <DraggableSvgWithAttrs>
        <svg
          id="add-circle"
          className="draggable__svg"
          viewBox="-1 -1 42 42"
          width={ELEMENT_SIZE + 2}
          height={ELEMENT_SIZE + 2}
        >
          <circle
            cx={ELEMENT_SIZE / 2}
            cy={ELEMENT_SIZE / 2}
            r={ELEMENT_SIZE / 2}
            stroke="#000000"
            fill="#000000"
            fillOpacity={0}
          />
        </svg>
      </DraggableSvgWithAttrs>
      <DraggableSvgWithAttrs>
        <svg id="add-rectangle" className="draggable__svg">
          <rect
            width={ELEMENT_SIZE}
            height={ELEMENT_SIZE}
            stroke="#000000"
            fill="#000000"
            fillOpacity={0}
          />
        </svg>
      </DraggableSvgWithAttrs>
      <DraggableSvgWithAttrs>
        <svg
          id="add-ellipse"
          className="draggable__svg"
          viewBox="-1 -1 41 22"
          width={ELEMENT_SIZE + 2}
          height={ELEMENT_SIZE / 2 + 2}
        >
          <ellipse
            cx={ELEMENT_SIZE / 2}
            cy={ELEMENT_SIZE / 4}
            rx={ELEMENT_SIZE / 2}
            ry={ELEMENT_SIZE / 4}
            stroke="#000000"
            fill="#000000"
            fillOpacity={0}
          />
        </svg>
      </DraggableSvgWithAttrs>
      <DraggableSvgWithAttrs>
        <svg id="add-path" className="draggable__svg">
          <path
            d={`M 0 ${ELEMENT_SIZE} L ${ELEMENT_SIZE} 0`}
            stroke="#000000"
            fill="#000000"
            fillOpacity={0}
          />
        </svg>
      </DraggableSvgWithAttrs>
    </div>
  );
};
