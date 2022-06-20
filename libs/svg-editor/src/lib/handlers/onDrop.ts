import * as React from 'react';
import { resizeSvg } from '../utils/svg';

import {
  ADD_ELEMENT_SIZE,
  EDITOR_HEIGHT_ADD,
  EDITOR_WIDTH_ADD,
} from '@pp-master-thesis/constants';
import { ZoomableRef } from '@pp-master-thesis/types';
import { ELEMENT_SIZE_ATTRIBUTES } from '@pp-master-thesis/constants';

const resizeDimensions = (
  x: number,
  y: number,
  svg: SVGSVGElement
): { width: number; height: number } => {
  const dimension = (coord: number, size: number, editorSize: number) =>
    coord < 0
      ? Math.floor(coord / size) * size
      : coord > editorSize - ADD_ELEMENT_SIZE
      ? Math.ceil((coord - editorSize + ADD_ELEMENT_SIZE) / size) * size
      : 0;
  return {
    width: dimension(x, EDITOR_WIDTH_ADD, svg.width.baseVal.value),
    height: dimension(y, EDITOR_HEIGHT_ADD, svg.height.baseVal.value),
  };
};

export const onDrop = ({
  event,
  zoomableRef,
  svg,
  zoom,
  setSvgSize,
}: {
  event: React.DragEvent;
  zoomableRef: React.RefObject<ZoomableRef>;
  svg: SVGSVGElement | undefined;
  zoom: number;
  setSvgSize: React.Dispatch<React.SetStateAction<DOMRectReadOnly | undefined>>;
}) => {
  const element = document.getElementById(
    event.dataTransfer.getData('elementId')
  )?.firstElementChild;
  const editor = zoomableRef.current;
  if (!element || !editor || !svg) return;
  const elementCopy = element.cloneNode(true) as SVGElement;
  const { x, y } = editor.getMousePoint(event);
  const { xName, yName } = ELEMENT_SIZE_ATTRIBUTES[elementCopy.nodeName];
  const newX = x + Number(elementCopy.getAttribute(xName));
  const newY = y + Number(elementCopy.getAttribute(yName));
  elementCopy.setAttribute(xName, newX.toString());
  elementCopy.setAttribute(yName, newY.toString());
  svg.appendChild(elementCopy);

  const { width, height } = resizeDimensions(x, y, svg);
  resizeSvg({
    zoomableRef,
    svg,
    setSvgSize,
    zoom,
    width,
    height,
  });
};
