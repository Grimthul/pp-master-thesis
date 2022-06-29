import type { MouseEvent } from 'react';

import { nodeCoordsInEditor, nodeSize } from './utils';

import { roundToMultiple } from '@pp-master-thesis/utils';

import type { SvgEditorOptions, ZoomableRef } from '@pp-master-thesis/types';

enum SidesX {
  left = 'left',
  middleX = 'middleX',
  right = 'right',
}

enum SidesY {
  top = 'top',
  middleY = 'middleY',
  bottom = 'bottom',
}

const ElementSide = { ...SidesX, ...SidesY };
type ElementSide = typeof ElementSide;

interface GuideLineCoords {
  start: DOMPointReadOnly;
  end: DOMPointReadOnly;
}
type ElementGuideLine = {
  [key in keyof ElementSide]: GuideLineCoords;
};
type AlignedElement = {
  [key in keyof ElementSide]: boolean;
};

const getInitialGuideLinesCoords = () => ({
  start: new DOMPointReadOnly(Infinity, Infinity),
  end: new DOMPointReadOnly(-Infinity, -Infinity),
});
const getInitialElementGuideLines = () => ({
  left: getInitialGuideLinesCoords(),
  middleX: getInitialGuideLinesCoords(),
  right: getInitialGuideLinesCoords(),
  top: getInitialGuideLinesCoords(),
  middleY: getInitialGuideLinesCoords(),
  bottom: getInitialGuideLinesCoords(),
});

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
const getAlignedElements = (
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

const furtherGuideLineCoords = (
  current: GuideLineCoords,
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

const offsetX = (width: number) => ({
  [SidesX.left]: 0,
  [SidesX.middleX]: width / 2,
  [SidesX.right]: width,
});
const offsetY = (height: number) => ({
  [SidesY.top]: 0,
  [SidesY.middleY]: height / 2,
  [SidesY.bottom]: height,
});

const keyCoords = (key: string): { isX?: boolean; isY?: boolean } =>
  key in SidesX ? { isX: true } : { isY: true };

/**
 * Returns the farthest elements for each side of given element.
 */
const farthestElementsInAxes = (
  mouse: DOMPointReadOnly,
  snapRadius: number,
  dragImage: Element,
  svgElements: SVGElement[]
): ElementGuideLine => {
  const dragImageWidth = dragImage.clientWidth;
  const dragImageHeight = dragImage.clientHeight;

  return svgElements
    .filter((element) => {
      const { width: elementWidth, height: elementHeight } = nodeSize(element);
      return elementWidth || elementHeight;
    })
    .reduce((acc: ElementGuideLine, element) => {
      const { x: elementX, y: elementY } = nodeCoordsInEditor(element);
      const { width: elementWidth, height: elementHeight } = nodeSize(element);
      const alignedElements = getAlignedElements(
        mouse.x - elementX,
        mouse.y - elementY,
        dragImageWidth,
        dragImageHeight,
        elementWidth,
        elementHeight || elementWidth,
        snapRadius
      );
      const alignedElementsKeys = Object.keys(alignedElements) as Array<
        keyof AlignedElement
      >;
      /**
       * Processes alignedElements, for each side of dragImage chooses the farthest one.
       */
      return alignedElementsKeys.reduce((updatedGuideLines, key) => {
        if (alignedElements[key]) {
          const { isX, isY } = keyCoords(key);
          const addHeight = isX ? elementHeight || elementWidth : 0;
          const addWidth = isY ? elementWidth : 0;
          const valX = isX
            ? roundToMultiple(
                mouse.x + offsetX(dragImageWidth)[key as SidesX],
                elementWidth / 2,
                elementX
              )
            : elementX;
          const valY = isY
            ? roundToMultiple(
                mouse.y + offsetY(dragImageHeight)[key as SidesY],
                (elementHeight || elementWidth) / 2,
                elementY
              )
            : elementY;
          updatedGuideLines[key] = furtherGuideLineCoords(
            acc[key],
            { addHeight, addWidth },
            { valX, valY }
          );
        }
        return updatedGuideLines;
      }, acc);
    }, getInitialElementGuideLines());
};

const zeroTranslate = () => ({ tx: 0, ty: 0 });
const infiniteTranslate = () => ({ tx: Infinity, ty: Infinity });
const isGuideLineFinite = (guideLine: GuideLineCoords) =>
  isFinite(guideLine.start.x) &&
  isFinite(guideLine.start.y) &&
  isFinite(guideLine.end.x) &&
  isFinite(guideLine.end.y);

const elementsSnapTranslate = (
  mouse: DOMPointReadOnly,
  elements: SVGElement[],
  dragImage: Element,
  snapRadius = 0
) => {
  if (elements?.length) {
    const dragImageWidth = dragImage.clientWidth;
    const dragImageHeight = dragImage.clientHeight;
    const farthestElements = farthestElementsInAxes(
      mouse,
      snapRadius,
      dragImage,
      elements
    );
    const farthestElementsKeys = Object.keys(farthestElements) as Array<
      keyof AlignedElement
    >;
    return farthestElementsKeys.reduce((acc, key) => {
      const guideLine: GuideLineCoords = farthestElements[key];
      if (isGuideLineFinite(guideLine)) {
        const { isX, isY } = keyCoords(key);
        return {
          tx:
            isX && !isFinite(acc.tx)
              ? guideLine.start.x -
                mouse.x -
                offsetX(dragImageWidth)[key as SidesX]
              : acc.tx,
          ty:
            isY && !isFinite(acc.ty)
              ? guideLine.start.y -
                mouse.y -
                offsetY(dragImageHeight)[key as SidesY]
              : acc.ty,
        };
      }
      return acc;
    }, infiniteTranslate());
  }
  return infiniteTranslate();
};

const gridSnapTranslate = (mouse: DOMPointReadOnly, gap: number) => {
  const tx = roundToMultiple(mouse.x, gap) - mouse.x;
  const ty = roundToMultiple(mouse.y, gap) - mouse.y;
  return { tx, ty };
};

/**
 * Counts the nearest coordinates translation to snap dragImage/Element that
 * will be added onDrop event.
 * Snap is controlled by SvgEditorOptions - it can be either to
 * already present Element in SvgEditor or guideLines.
 * Element snapping has priority.
 */
export const dragImageTranslate = (
  event: MouseEvent,
  dragImage: Element,
  options: SvgEditorOptions,
  zoomable: ZoomableRef
): { tx: number; ty: number } => {
  const mouse = zoomable.getMousePoint(event);

  const elementsTranslate = options.elements?.snap
    ? elementsSnapTranslate(
        mouse,
        Array.from(zoomable?.getChild()?.children || []) as SVGElement[],
        dragImage,
        options?.elements?.snapRadius
      )
    : zeroTranslate();

  const gap = options.guideLines?.gap;
  const gridTranslate =
    options.guideLines?.snap && gap
      ? gridSnapTranslate(mouse, gap)
      : zeroTranslate();
  return {
    tx: isFinite(elementsTranslate.tx)
      ? elementsTranslate.tx
      : gridTranslate.tx,
    ty: isFinite(elementsTranslate.ty)
      ? elementsTranslate.ty
      : gridTranslate.ty,
  };
};
