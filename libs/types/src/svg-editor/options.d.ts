import { GuideLinesStyle } from '@pp-master-thesis/enums';

export interface SvgEditorOptions {
  editorBackgroundColor?: string;
  snapToElements?: boolean;
  guideLines?: {
    gap?: number;
    style?: GuideLinesStyle;
    color?: string;
    snap?: boolean;
  };
  size?: DOMRectReadOnly;
}
