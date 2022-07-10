import { getInitialGuideLinesCoords } from './generators';
import type { GuideLineCoords } from '../../types/dragElement';

export const isGuideLineFinite = (guideLine: GuideLineCoords) =>
  isFinite(guideLine.start.x) &&
  isFinite(guideLine.start.y) &&
  isFinite(guideLine.end.x) &&
  isFinite(guideLine.end.y);

export const furtherGuideLineCoords = (
  current = getInitialGuideLinesCoords(),
  { addWidth = 0, addHeight = 0 }: { addWidth?: number; addHeight?: number },
  { valX, valY }: { valX: number; valY: number }
): GuideLineCoords => {
  const { x: startX, y: startY } = current.start;
  const { x: endX, y: endY } = current.end;
  return {
    start: new DOMPointReadOnly(Math.min(startX, valX), Math.min(startY, valY)),
    end: new DOMPointReadOnly(
      Math.max(endX, valX + addWidth),
      Math.max(endY, valY + addHeight)
    ),
  };
};
