import { ELEMENT_SIZE_ATTRIBUTES } from '@pp-master-thesis/constants';
import { GuideLinesStyle } from '@pp-master-thesis/enums';

import type { SvgEditorOptions } from '@pp-master-thesis/types';

const GAP_DEFAULT_SIZE = 10;

export const mergeWithDefaultOptions = (
  options?: SvgEditorOptions
): SvgEditorOptions => ({
  backgroundColor: '#fff',
  zoomOptions: undefined,
  size: new DOMRectReadOnly(0, 0, 800, 600),
  ...options,
  guideLines: {
    gap: GAP_DEFAULT_SIZE,
    color: '#000',
    style: GuideLinesStyle.LINES,
    snap: true,
    hide: false,
    ...options?.guideLines,
  },
  elements: {
    snap: true,
    snapRadius: GAP_DEFAULT_SIZE / 2,
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
