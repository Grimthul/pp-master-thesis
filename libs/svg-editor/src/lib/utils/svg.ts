import React from 'react';
import { ELEMENT_SIZE_ATTRIBUTES } from '@pp-master-thesis/constants';
import { ZoomableRef } from '@pp-master-thesis/types';

export const translateElementTo = (
  element: SVGGraphicsElement,
  x: number,
  y: number
) => {
  const { xName, yName } = ELEMENT_SIZE_ATTRIBUTES[element.nodeName];
  element.setAttribute(xName, x.toString());
  element.setAttribute(yName, y.toString());
};

export const translateElement = (
  element: SVGGraphicsElement,
  tx: number,
  ty: number
) => {
  const { xName, yName } = ELEMENT_SIZE_ATTRIBUTES[element.nodeName];
  const newX = Number(element.getAttribute(xName)) + tx;
  element.setAttribute(xName, newX.toString());
  const newY = Number(element.getAttribute(yName)) + ty;
  element.setAttribute(yName, newY.toString());
};

const translateElements = ({
  elementsWrapper,
  tx,
  ty,
}: {
  elementsWrapper: SVGGElement;
  tx: number;
  ty: number;
}) => {
  Object.values(elementsWrapper.children).forEach((element) =>
    translateElement(element as SVGGraphicsElement, tx, ty)
  );
};

const resizeFactor = (size: number, zoom: number) =>
  size >= 0
    ? (-size * ((1 - zoom) / 2)) / zoom
    : (size * (0.5 + zoom / 2)) / zoom;

export const resizeSvg = ({
  zoomableRef,
  elementsWrapper,
  setSvgSize,
  zoom,
  width,
  height,
}: {
  zoomableRef: React.RefObject<ZoomableRef>;
  elementsWrapper: SVGGElement;
  setSvgSize: React.Dispatch<React.SetStateAction<DOMRectReadOnly | undefined>>;
  zoom: number;
  width: number;
  height: number;
}) => {
  if (!width && !height) return;
  const editorTranslateX = width && resizeFactor(width, zoom);
  const editorTranslateY = height && resizeFactor(height, zoom);
  const elementsTranslateX = width && Math.abs(Math.min(width, 0));
  const elementsTranslateY = height && Math.abs(Math.min(height, 0));

  zoomableRef.current?.translate(editorTranslateX, editorTranslateY);
  translateElements({
    elementsWrapper,
    tx: elementsTranslateX,
    ty: elementsTranslateY,
  });
  setSvgSize((prevState) => {
    return new DOMRectReadOnly(
      0,
      0,
      (prevState?.width || 0) + Math.abs(width),
      (prevState?.height || 0) + Math.abs(height)
    );
  });
};
