import * as React from 'react';
import { resizeSvg, nodeCoords } from '../utils/';
import * as Path from '../shapes/path';

import {
  ADD_ELEMENT_SIZE,
  EDITOR_HEIGHT_ADD,
  EDITOR_WIDTH_ADD,
} from '@pp-master-thesis/constants';
import { ZoomableRef } from '@pp-master-thesis/types';
import { ElementType } from '@pp-master-thesis/enums';

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
  const elementCopy = element.cloneNode(true) as SVGElement;
  const { x, y } = editor.getMousePoint(event);
  if (elementCopy.nodeName === ElementType.PATH) {
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

  elementCopy.setAttribute('draggable', 'true');
  elementsWrapper.appendChild(elementCopy);

  const { width, height } = resizeDimensions(x, y, svg);
  resizeSvg({
    zoomableRef,
    elementsWrapper,
    setSvgSize,
    zoom,
    width,
    height,
  });
};
