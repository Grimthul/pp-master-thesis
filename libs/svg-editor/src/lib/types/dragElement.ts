import { ElementSide } from '../enums/dragElement';

export type ElementSide = typeof ElementSide;

export interface GuideLineCoords {
  start: DOMPointReadOnly;
  end: DOMPointReadOnly;
}
export type ElementGuideLines = {
  [key in keyof ElementSide]?: GuideLineCoords;
};
export type AlignedElement = {
  [key in keyof ElementSide]: boolean;
};

export interface DragElementTranslate {
  tx: number;
  ty: number;
  guideLines?: ElementGuideLines;
}
