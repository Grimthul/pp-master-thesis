import { SidesX, SidesY } from '../../enums/dragImage';
import type { DragImageTranslate } from '../../types/dragImage';

export const zeroTranslate = (): DragImageTranslate => ({ tx: 0, ty: 0 });
export const infiniteTranslate = (): DragImageTranslate => ({
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

export const keyCoords = (key: string): { isX?: boolean; isY?: boolean } =>
  key in SidesX ? { isX: true } : { isY: true };
