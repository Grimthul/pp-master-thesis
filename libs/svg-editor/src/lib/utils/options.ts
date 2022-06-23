import type { SvgEditorOptions } from '@pp-master-thesis/types';
import { GuideLinesStyle } from '@pp-master-thesis/enums';

export const mergeWithDefaultOptions = (
  options?: SvgEditorOptions
): SvgEditorOptions => ({
  backgroundColor: '#fff',
  snapToElements: true,
  zoomOptions: undefined,
  size: new DOMRectReadOnly(0, 0, 800, 600),
  ...options,
  guideLines: {
    gap: 10,
    color: '#000',
    style: GuideLinesStyle.LINES,
    snap: true,
    hide: false,
    ...options?.guideLines,
  },
});
