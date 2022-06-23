import { GuideLinesStyle } from '@pp-master-thesis/enums';
import { ZoomOptions } from '../zoomable';

export interface SvgEditorOptions {
  backgroundColor?: string;
  snapToElements?: boolean;
  guideLines?: {
    gap?: number;
    style?: GuideLinesStyle;
    color?: string;
    snap?: boolean;
    hide?: boolean;
  };
  size?: DOMRectReadOnly;
  zoomOptions?: ZoomOptions;
}
