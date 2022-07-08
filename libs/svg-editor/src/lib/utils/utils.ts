import { SidesX } from '../enums/dragElement';

import { ELEMENT_SIZE_ATTRIBUTES } from '@pp-master-thesis/constants';
import { ElementType, GridLinesStyle } from '@pp-master-thesis/enums';

import type { SvgEditorOptions } from '@pp-master-thesis/types';

const GAP_DEFAULT_SIZE = 10;
const ELEMENT_SNAP_RADIUS_MIN = 2;

const CIRCULAR_ELEMENTS = [ElementType.CIRCLE, ElementType.ELLIPSE];

export const isCircular = (node: Element) =>
  CIRCULAR_ELEMENTS.includes(node.nodeName as ElementType);

export const mergeWithDefaultOptions = (
  options?: SvgEditorOptions
): SvgEditorOptions => ({
  backgroundColor: '#fff',
  zoomOptions: undefined,
  size: new DOMRectReadOnly(0, 0, 800, 600),
  ...options,
  grid: {
    gap: GAP_DEFAULT_SIZE,
    color: '#000',
    style: GridLinesStyle.LINES,
    snap: true,
    hide: false,
    ...options?.grid,
  },
  elements: {
    snap: true,
    snapRadius:
      Math.max(
        options?.grid?.gap ?? GAP_DEFAULT_SIZE,
        ELEMENT_SNAP_RADIUS_MIN
      ) / 2,
    ...options?.elements,
  },
});

export const nodeCoords = (
  node: Element
): { xName: string; yName: string; x: number; y: number } => {
  const { xName, yName } = ELEMENT_SIZE_ATTRIBUTES[node.nodeName];
  return {
    xName,
    yName,
    x: Number(node.getAttribute(xName)),
    y: Number(node.getAttribute(yName)),
  };
};

export const nodeSize = (node: Element): { width: number; height?: number } => {
  const { widthName, heightName } = ELEMENT_SIZE_ATTRIBUTES[node.nodeName];
  const width = Number(node.getAttribute(widthName));
  const height = heightName ? Number(node.getAttribute(heightName)) : undefined;
  return {
    width: isCircular(node) ? width * 2 : width,
    height: isCircular(node) ? (height ?? width) * 2 : height,
  };
};

export const nodeCoordsInEditor = (
  node: Element
): { xName: string; yName: string; x: number; y: number } => {
  const { xName, yName, x, y } = nodeCoords(node);
  const { width, height } = nodeSize(node);
  return {
    xName,
    yName,
    x: isCircular(node) ? x - width / 2 : x,
    y: isCircular(node) ? y - (height ?? width) / 2 : y,
  };
};

export const keyCoords = (key: string): { isX?: boolean; isY?: boolean } =>
  key in SidesX ? { isX: true } : { isY: true };
