import { SidesX } from '../enums/dragElement';

import { ElementType, GridLinesStyle, Tool } from '@pp-master-thesis/enums';

import type { SvgEditorOptions } from '@pp-master-thesis/types';

interface ElementSizeAttributes {
  [key: string]: {
    xName: string;
    yName: string;
    widthName: string;
    heightName?: string;
  };
}

const GAP_DEFAULT_SIZE = 10;
const ELEMENT_SNAP_RADIUS_MIN = 2;

const CIRCULAR_ELEMENTS = [ElementType.CIRCLE, ElementType.ELLIPSE];

const ELEMENT_SIZE_ATTRIBUTES: ElementSizeAttributes = {
  rect: { xName: 'x', yName: 'y', widthName: 'width', heightName: 'height' },
  image: { xName: 'x', yName: 'y', widthName: 'width', heightName: 'height' },
  svg: { xName: 'x', yName: 'y', widthName: 'width', heightName: 'height' },
  circle: { xName: 'cx', yName: 'cy', widthName: 'r' },
  ellipse: { xName: 'cx', yName: 'cy', widthName: 'rx', heightName: 'ry' },
  text: { xName: 'x', yName: 'y', widthName: 'font-size' },
};

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

export const nodeSizeNames = (node: Element) =>
  ELEMENT_SIZE_ATTRIBUTES[node.nodeName];

export const nodeSize = (
  node: Element
): {
  width: number;
  height?: number;
} => {
  const { widthName, heightName } = nodeSizeNames(node);
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

export const isResizing = (tool: Tool) => tool.includes('-RESIZE');
export const isPanning = (tool: Tool) => tool === Tool.PAN;
export const isPathMoving = (tool: Tool) => tool === Tool.PATH_MOVE_POINT;
