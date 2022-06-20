import type { SvgEditorOptions } from '@pp-master-thesis/types';
import { GuideLinesStyle } from '@pp-master-thesis/enums';

export const mergeWithDefaultOptions = (
  options?: SvgEditorOptions
): SvgEditorOptions => ({
  editorBackgroundColor: '#fff',
  snapToElements: true,
  ...options,
  guideLines: {
    gap: 10,
    color: '#000',
    style: GuideLinesStyle.LINES,
    snap: true,
    ...options?.guideLines,
  },
  size: options?.size ?? new DOMRectReadOnly(0, 0, 800, 600),
});
