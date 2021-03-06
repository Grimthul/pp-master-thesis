import * as React from 'react';

import { isPrimaryButton, strokeWidthByZoom } from '@pp-master-thesis/utils';
import { Tool } from '@pp-master-thesis/enums';

import type { GetMousePoint } from '@pp-master-thesis/types';

import './ActivableSvg.scss';

type Props = React.SVGProps<SVGSVGElement> & {
  activeElements: SVGGraphicsElement[];
  setActiveElements: React.Dispatch<React.SetStateAction<SVGGraphicsElement[]>>;
  tool: Tool;
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
  getMousePoint?: GetMousePoint;
  zoom: number;
};

export const ActivableSvg = React.forwardRef(
  (
    {
      children,
      activeElements,
      setActiveElements,
      tool,
      setTool,
      getMousePoint,
      zoom,
      ...props
    }: Props,
    ref: React.ForwardedRef<SVGSVGElement>
  ) => {
    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const [clicked, setClicked] = React.useState(false);
    const [moved, setMoved] = React.useState(false);
    const [selectorStartInSvg, setSelectorStartInSvg] =
      React.useState<DOMPointReadOnly>();
    const [mouseDragPosInSvg, setMouseDragPosInSvg] =
      React.useState<DOMPointReadOnly>();
    const [selectorStart, setSelectorStart] =
      React.useState<DOMPointReadOnly>();
    const [mouseDragPos, setMouseDragPos] = React.useState<DOMPointReadOnly>();

    React.useEffect(() => {
      if (selectorStart) setTool(Tool.SELECTING_ELEMENTS);
      else setTool(Tool.NONE);
    }, [selectorStart, setTool]);

    const mousePosition = React.useCallback(
      (event: React.MouseEvent) =>
        new DOMPointReadOnly(event.clientX, event.clientY),
      []
    );

    const setSelectorStarts = React.useCallback(
      (event: React.MouseEvent) => {
        if (getMousePoint) {
          setSelectorStart(mousePosition(event));
          setSelectorStartInSvg(getMousePoint(event));
        }
      },
      [getMousePoint, mousePosition]
    );

    const isEditor = React.useCallback(
      (element: SVGGraphicsElement) => element === svgRef.current,
      []
    );

    const onMouseDown = React.useCallback(
      (event: React.MouseEvent) => {
        const target = event.target as SVGGraphicsElement;
        if (target === svgRef.current) setSelectorStarts(event);
        else setClicked(true);
        if (
          event.ctrlKey ||
          !svgRef.current?.firstChild?.contains(target) || // to disable activating element controls
          activeElements.includes(target) ||
          isEditor(target)
        )
          return;
        setActiveElements([target]);
      },
      [activeElements, isEditor, setActiveElements, setSelectorStarts]
    );

    const onMouseMove = React.useCallback(
      (event: React.MouseEvent) => {
        if (isPrimaryButton(event.buttons)) setMoved(true);
        if (!event.ctrlKey && selectorStart && getMousePoint) {
          setMouseDragPos(mousePosition(event));
          setMouseDragPosInSvg(getMousePoint(event));
        }
      },
      [getMousePoint, mousePosition, selectorStart]
    );

    const elementsInsideSelector = React.useCallback(
      (selectorStart: DOMPointReadOnly, mouseDragPos: DOMPointReadOnly) => {
        const startX = Math.min(selectorStart.x, mouseDragPos.x);
        const startY = Math.min(selectorStart.y, mouseDragPos.y);
        const endX = Math.max(selectorStart.x, mouseDragPos.x);
        const endY = Math.max(selectorStart.y, mouseDragPos.y);
        return Array.from(
          (svgRef?.current?.firstChild?.childNodes ||
            []) as SVGGraphicsElement[]
        ).filter((element) => {
          const { left, top, width, height } = element.getBoundingClientRect();
          return (
            left + width >= startX &&
            left <= endX &&
            top + height >= startY &&
            top <= endY
          );
        });
      },
      []
    );

    const size = React.useCallback(
      (start: number, end: number) =>
        Math.max(strokeWidthByZoom(zoom), Math.abs(start - end)),
      [zoom]
    );

    const selectorRectAttributes = React.useCallback(
      (start: DOMPointReadOnly, end: DOMPointReadOnly) => {
        if (!svgRef.current) return;
        const { x: startX, y: startY } = start;
        const { x: endX, y: endY } = end;
        const width = size(startX, endX);
        const height = size(startY, endY);
        return {
          x: startX > endX ? endX : startX,
          y: startY > endY ? endY : startY,
          width,
          height,
        };
      },
      [size]
    );

    // there the useCallback is useless
    const onMouseUp = (event: React.MouseEvent) => {
      const target = event.target as SVGGraphicsElement;
      // editor
      if (
        !event.ctrlKey &&
        isEditor(target) &&
        activeElements.length &&
        !mouseDragPos &&
        tool === Tool.NONE
      ) {
        setActiveElements([]);
      }
      // elements
      else if (!activeElements.includes(target) || activeElements.length > 1) {
        if (svgRef.current?.firstChild?.contains(target) && clicked && !moved) {
          setActiveElements([target]);
        }
        if (selectorStart && mouseDragPos) {
          setActiveElements(
            elementsInsideSelector(selectorStart, mouseDragPos)
          );
        }
      }
      setSelectorStart(undefined);
      setSelectorStartInSvg(undefined);
      setMouseDragPos(undefined);
      setMouseDragPosInSvg(undefined);
      setClicked(false);
      setMoved(false);
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
        onContextMenu={(event) => event.preventDefault()}
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
