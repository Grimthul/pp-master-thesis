import { SidesX, SidesY } from '../../enums/dragElement';
import type { DragElementTranslate } from '../../types/dragElement';

export const zeroTranslate = (): DragElementTranslate => ({ tx: 0, ty: 0 });
export const infiniteTranslate = (): DragElementTranslate => ({
  tx: Infinity,
  ty: Infinity,
  guideLines: {},
});

export const offsetX = (width: number) => ({
  [SidesX.left]: 0,
  [SidesX.middleX]: width / 2,
  [SidesX.right]: width,
});
export const offsetY = (height: number) => ({
  [SidesY.top]: 0,
  [SidesY.middleY]: height / 2,
  [SidesY.bottom]: height,
});

export const getInitialGuideLinesCoords = () => ({
  start: new DOMPointReadOnly(Infinity, Infinity),
  end: new DOMPointReadOnly(-Infinity, -Infinity),
});
export const getInitialElementGuideLines = () => ({
  left: getInitialGuideLinesCoords(),
  middleX: getInitialGuideLinesCoords(),
  right: getInitialGuideLinesCoords(),
  top: getInitialGuideLinesCoords(),
  middleY: getInitialGuideLinesCoords(),
  bottom: getInitialGuideLinesCoords(),
});
