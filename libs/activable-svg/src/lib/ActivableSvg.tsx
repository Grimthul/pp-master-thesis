import * as React from 'react';

import { strokeWidthByZoom } from '@pp-master-thesis/utils';
import type { GetMousePoint } from '@pp-master-thesis/types';

import './ActivableSvg.scss';

type Props = React.SVGProps<SVGSVGElement> & {
  setActiveElements: React.Dispatch<
    React.SetStateAction<SVGElement[] | undefined>
  >;
  getMousePoint: GetMousePoint | undefined;
  zoom: number;
};

export const ActivableSvg = React.forwardRef(
  (
    { setActiveElements, getMousePoint, children, zoom, ...props }: Props,

    ref: React.ForwardedRef<SVGSVGElement>
  ) => {
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const [selectorStartInSvg, setSelectorStartInSvg] =
      React.useState<DOMPointReadOnly>();
    const [mouseDragPosInSvg, setMouseDragPosInSvg] =
      React.useState<DOMPointReadOnly>();
    const [selectorStart, setSelectorStart] =
      React.useState<DOMPointReadOnly>();
    const [mouseDragPos, setMouseDragPos] = React.useState<DOMPointReadOnly>();

    const mousePosition = (event: React.MouseEvent) =>
      new DOMPointReadOnly(event.clientX, event.clientY);

    const onMouseDown = (event: React.MouseEvent) => {
      if (getMousePoint && !event.ctrlKey) {
        setSelectorStart(mousePosition(event));
        setSelectorStartInSvg(getMousePoint(event));
      }
    };

    const onMouseMove = (event: React.MouseEvent) => {
      if (getMousePoint && selectorStart) {
        setMouseDragPos(mousePosition(event));
        setMouseDragPosInSvg(getMousePoint(event));
      }
    };

    const elementsInsideSelector = (
      selectorStart: DOMPointReadOnly,
      mouseDragPos: DOMPointReadOnly
    ) => {
      const startX = Math.min(selectorStart.x, mouseDragPos.x);
      const startY = Math.min(selectorStart.y, mouseDragPos.y);
      const endX = Math.max(selectorStart.x, mouseDragPos.x);
      const endY = Math.max(selectorStart.y, mouseDragPos.y);
      return Array.from(
        (svgRef?.current?.firstChild?.childNodes || []) as SVGElement[]
      ).filter((element) => {
        const { left, top, width, height } = element.getBoundingClientRect();
        return (
          left + width >= startX &&
          left <= endX &&
          top + height >= startY &&
          top <= endY
        );
      });
    };

    const onMouseUp = (event: React.MouseEvent) => {
      if (selectorStart && mouseDragPos) {
        setActiveElements(elementsInsideSelector(selectorStart, mouseDragPos));
      }
      setSelectorStart(undefined);
      setSelectorStartInSvg(undefined);
      setMouseDragPos(undefined);
      setMouseDragPosInSvg(undefined);
    };

    const selectorRectAttributes = (
      start: DOMPointReadOnly,
      end: DOMPointReadOnly
    ) => {
      if (!svgRef.current) return;

      const { x: startX, y: startY } = start;
      const { x: endX, y: endY } = end;
      const width = Math.max(strokeWidthByZoom(zoom), Math.abs(startX - endX));
      const height = Math.max(strokeWidthByZoom(zoom), Math.abs(startY - endY));
      return {
        x: startX > endX ? endX : startX,
        y: startY > endY ? endY : startY,
        width,
        height,
      };
    };

    return (
      <svg
        {...props}
        ref={(node) => {
          svgRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<SVGSVGElement | null>).current =
              node;
          }
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {children}
        {selectorStartInSvg && mouseDragPosInSvg && (
          <rect
            stroke="#d17127d9"
            fill="#d1712744"
            strokeWidth={strokeWidthByZoom(zoom)}
            {...selectorRectAttributes(selectorStartInSvg, mouseDragPosInSvg)}
          />
        )}
      </svg>
    );
  }
);
