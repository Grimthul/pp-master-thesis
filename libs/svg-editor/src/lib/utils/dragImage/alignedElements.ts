import type { AlignedElement } from '../../types/dragImage';

const isInBounds = (bound: number) => (coord: number) =>
  coord >= -bound && coord <= bound;

const isAligned =
  (diff: number, elementSize: number, snapRadius: number) =>
  (offset = 0) => {
    const isInSnapRadius = isInBounds(snapRadius);
    return (
      isInSnapRadius(diff + offset) ||
      isInSnapRadius(diff + offset - elementSize / 2) ||
      isInSnapRadius(diff + offset - elementSize)
    );
  };

/**
 * Returns boolean for each side of dragImage that is aligned with some element in svg.
 */
export const getAlignedElements = (
  xDiff: number,
  yDiff: number,
  elementWidth: number,
  elementHeight: number | undefined,
  dragImageWidth: number,
  dragImageHeight: number,
  snapRadius: number
): AlignedElement => {
  const isAlignedX = isAligned(xDiff, elementWidth, snapRadius);
  const isAlignedY = isAligned(
    yDiff,
    elementHeight ?? elementWidth,
    snapRadius
  );
  return {
    left: isAlignedX(),
    middleX: isAlignedX(dragImageWidth / 2),
    right: isAlignedX(dragImageWidth),
    top: isAlignedY(),
    middleY: isAlignedY(dragImageHeight / 2),
    bottom: isAlignedY(dragImageHeight),
  };
};
