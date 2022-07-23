import * as React from 'react';

import * as Path from '../shapes/path';
import { resizeSvg, nodeCoords, isPath } from '../utils/';

import { ZoomableRef } from '@pp-master-thesis/types';

const resizeDimensions = (
  x: number,
  y: number,
  svg: SVGSVGElement,
  addElementSize: number
): { width: number; height: number } => {
  const dimension = (coord: number, size: number, editorSize: number) =>
    coord < 0
      ? Math.floor(coord / size) * size
      : coord > editorSize - addElementSize
      ? Math.ceil((coord - editorSize + addElementSize) / size) * size
      : 0;
  return {
    width: dimension(x, 600, svg.width.baseVal.value),
    height: dimension(y, 600, svg.height.baseVal.value),
  };
};

export const onDrop = ({
  event,
  zoomableRef,
  svg,
  elementsWrapper,
  zoom,
  dragOffset,
  setSvgSize,
}: {
  event: React.DragEvent;
  zoomableRef: React.RefObject<ZoomableRef>;
  svg: SVGSVGElement | undefined;
  elementsWrapper: SVGGElement | null;
  zoom: number;
  dragOffset: { tx: number; ty: number };
  setSvgSize: React.Dispatch<React.SetStateAction<DOMRectReadOnly | undefined>>;
}) => {
  const element = document.getElementById(
    event.dataTransfer.getData('elementId')
  )?.firstElementChild;
  const editor = zoomableRef.current;
  if (!element || !editor || !svg || !elementsWrapper) return;
  const elementCopy = element.cloneNode(true) as SVGGraphicsElement;
  const { x, y } = editor.getMousePoint(event);
  if (isPath(element)) {
    const d = elementCopy.getAttribute('d') || '';
    elementCopy.setAttribute(
      'd',
      Path.moveBy(d, x + dragOffset.tx, y + dragOffset.ty)
    );
  } else {
    const { xName, yName, x: elementX, y: elementY } = nodeCoords(elementCopy);
    const newX = Math.round(x + elementX + dragOffset.tx);
    const newY = Math.round(y + elementY + dragOffset.ty);
    elementCopy.setAttribute(xName, newX.toString());
    elementCopy.setAttribute(yName, newY.toString());
  }

  elementsWrapper.appendChild(elementCopy);

  const { width, height } = resizeDimensions(
    x,
    y,
    svg,
    elementCopy.getBBox().width
  );
  resizeSvg({
    zoomableRef,
    elementsWrapper,
    setSvgSize,
    zoom,
    width,
    height,
  });
};
