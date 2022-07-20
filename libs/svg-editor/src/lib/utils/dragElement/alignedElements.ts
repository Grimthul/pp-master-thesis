import type { AlignedElement } from '../../types/dragElement';

const isInBounds = (bound: number) => (coord: number) =>
  coord >= -bound && coord <= bound;

const isAligned =
  (diff: number, elementSize: number, snapRadius: number) =>
  (offset = 0) => {
    const isInSnapRadius = isInBounds(snapRadius - 0.01);
    return (
      isInSnapRadius(diff + offset) ||
      isInSnapRadius(diff + offset - elementSize / 2) ||
      isInSnapRadius(diff + offset - elementSize)
    );
  };

/**
 * Returns boolean for each side of dragElement that is aligned with some element in svg.
 */
export const getAlignedElements = (
  xDiff: number,
  yDiff: number,
  elementWidth: number,
  elementHeight: number | undefined,
  dragElementWidth: number,
  dragElementHeight: number,
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
    middleX: isAlignedX(dragElementWidth / 2),
    right: isAlignedX(dragElementWidth),
    top: isAlignedY(),
    middleY: isAlignedY(dragElementHeight / 2),
    bottom: isAlignedY(dragElementHeight),
  };
};
