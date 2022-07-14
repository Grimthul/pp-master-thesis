import { GridLinesStyle, GridLinesStyle } from '@pp-master-thesis/enums';
import type { ZoomOptions } from '../zoomable';

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
  zoomOptions?: ZoomOptions;
}
