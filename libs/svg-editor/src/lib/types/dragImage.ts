import { ElementSide } from '../enums/dragImage';

export type ElementSide = typeof ElementSide;

export interface GuideLineCoords {
  start: DOMPointReadOnly;
  end: DOMPointReadOnly;
}
export type ElementGuideLine = {
  [key in keyof ElementSide]?: GuideLineCoords;
};
export type AlignedElement = {
  [key in keyof ElementSide]: boolean;
};

export interface DragImageTranslate {
  tx: number;
  ty: number;
  guideLines?: ElementGuideLine;
}
