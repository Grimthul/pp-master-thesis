import { GuideLinesStyle } from '@pp-master-thesis/enums';
import { ZoomOptions } from '../zoomable';

export interface SvgEditorOptions {
  backgroundColor?: string;
  guideLines?: {
    gap?: number;
    style?: GuideLinesStyle;
    color?: string;
    snap?: boolean;
    hide?: boolean;
  };
  elements?: {
    snap?: boolean;
    snapRadius?: number;
  };
  size?: DOMRectReadOnly;
  zoomOptions?: ZoomOptions;
}
