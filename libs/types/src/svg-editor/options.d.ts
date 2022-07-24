import type { ZoomOptions } from '../zoomable';

import { GridLinesStyle, GridLinesStyle } from '@pp-master-thesis/enums';

export interface SvgEditorOptions {
  backgroundColor?: string;
  grid?: {
    gap?: number;
    style?: GridLinesStyle;
    color?: string;
    snap?: boolean;
    hide?: boolean;
  };
  elements?: {
    snap?: boolean;
    snapRadius?: number;
  };
  visible?: boolean;
  zoomOptions?: ZoomOptions;
}
