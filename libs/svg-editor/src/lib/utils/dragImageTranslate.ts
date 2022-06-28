import type { MouseEvent } from 'react';

import { nodeCoordsInEditor, nodeSize } from './utils';

import { roundToMultiple } from '@pp-master-thesis/utils';

import type { SvgEditorOptions, ZoomableRef } from '@pp-master-thesis/types';

interface GuideLineCoords {
  start: DOMPointReadOnly;
  end: DOMPointReadOnly;
}

interface ElementGuideLines {
  left: GuideLineCoords;
  middleX: GuideLineCoords;
  right: GuideLineCoords;
  top: GuideLineCoords;
  middleY: GuideLineCoords;
  bottom: GuideLineCoords;
}

interface AlignedElements {
  left: boolean;
  middleX: boolean;
  right: boolean;
  top: boolean;
  middleY: boolean;
  bottom: boolean;
}

const INITIAL_GUIDE_LINES_COORDS = () => ({
  start: new DOMPointReadOnly(Infinity, Infinity),
  end: new DOMPointReadOnly(-Infinity, -Infinity),
});
const INITIAL_ELEMENT_GUIDE_LINES = () => ({
  left: INITIAL_GUIDE_LINES_COORDS(),
  middleX: INITIAL_GUIDE_LINES_COORDS(),
  right: INITIAL_GUIDE_LINES_COORDS(),
  top: INITIAL_GUIDE_LINES_COORDS(),
  middleY: INITIAL_GUIDE_LINES_COORDS(),
  bottom: INITIAL_GUIDE_LINES_COORDS(),
});

enum SidesX {
  LEFT = 'left',
  MIDDLEX = 'middleX',
  RIGHT = 'right',
}

enum SidesY {
  TOP = 'top',
  MIDDLEY = 'middleY',
  BOTTOM = 'bottom',
}

const isInBounds = (bound: number) => (coord: number) =>
  coord >= -bound && coord <= bound;

const isAligned =
  ({
    diff,
    elementSize,
    snapRadius,
  }: {
    diff: number;
    elementSize: number;
    snapRadius: number;
  }) =>
  (offset = 0) => {
    const isInSnapRadius = isInBounds(snapRadius);
    return (
      isInSnapRadius(diff + offset) ||
      isInSnapRadius(diff + offset - elementSize / 2) ||
      isInSnapRadius(diff + offset - elementSize)
    );
  };

const getAlignedElements = ({
  xDiff,
  yDiff,
  elementWidth,
  elementHeight,
  dragImageWidth,
  dragImageHeight,
  snapRadius,
}: {
  xDiff: number;
  yDiff: number;
  elementWidth: number;
  elementHeight: number | undefined;
  dragImageWidth: number;
  dragImageHeight: number;
  snapRadius: number;
}): AlignedElements => {
  const isAlignedX = isAligned({
    diff: xDiff,
    elementSize: elementWidth,
    snapRadius,
  });
  const isAlignedY = isAligned({
    diff: yDiff,
    elementSize: elementHeight ?? elementWidth,
    snapRadius,
  });
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

/**
 * Returns the farthest elements for each side of given element.
 */
const farthestElementsInAxes = (
  mouse: DOMPointReadOnly,
  snapRadius: number,
  dragImage: Element,
  svgElements: SVGElement[]
): ElementGuideLines => {
  const dragImageWidth = dragImage.clientWidth;
  const dragImageHeight = dragImage.clientHeight;

  return svgElements
    .filter((element) => {
      const { width: elementWidth, height: elementHeight } = nodeSize(element);
      return elementWidth || elementHeight;
    })
    .reduce((acc: ElementGuideLines, element) => {
      const { x: elementX, y: elementY } = nodeCoordsInEditor(element);
      const { width: elementWidth, height: elementHeight } = nodeSize(element);
      const alignedElements: AlignedElements = getAlignedElements({
        xDiff: mouse.x - elementX,
        yDiff: mouse.y - elementY,
        dragImageWidth,
        dragImageHeight,
        elementWidth,
        elementHeight,
        snapRadius,
      });
      const alignedElementsKeys = Object.keys(alignedElements) as Array<
        keyof AlignedElements
      >;

      return alignedElementsKeys.reduce((acc2: ElementGuideLines, key) => {
        if (alignedElements[key]) {
          const isX = Object.values(SidesX).includes(key as SidesX);
          const isY = Object.values(SidesY).includes(key as SidesY);
          const offsetX = {
            [SidesX.LEFT]: 0,
            [SidesX.MIDDLEX]: dragImageWidth / 2,
            [SidesX.RIGHT]: dragImageWidth,
          };
          const offsetY = {
            [SidesY.TOP]: 0,
            [SidesY.MIDDLEY]: dragImageHeight / 2,
            [SidesY.BOTTOM]: dragImageHeight,
          };
          const addHeight = isX ? elementHeight || elementWidth : 0;
          const addWidth = isY ? elementWidth : 0;
          const valX = isX ? mouse.x + offsetX[key as SidesX] : elementX;
          const valY = isY ? mouse.y + offsetY[key as SidesY] : elementY;
          acc2[key] = furtherGuideLineCoords(
            acc[key],
            { addHeight, addWidth },
            { valX, valY }
          );
        }
        return acc2;
      }, acc);
    }, INITIAL_ELEMENT_GUIDE_LINES());
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
  if (options.elements?.snap) {
    const snapRadius = options.elements?.snapRadius || 0;
    const svgElements = Array.from(
      zoomable?.getChild()?.children || []
    ) as SVGElement[];
    if (svgElements) {
      const farthestElements = farthestElementsInAxes(
        mouse,
        snapRadius,
        dragImage,
        svgElements
      );

      const { left, middleX, right, top, middleY, bottom } = farthestElements;
      console.log(farthestElements);

      // const tx = elX ? nodeCoords(elX).x - mouse.x : 0;
      // const ty = elY ? nodeCoords(elY).y - mouse.y : 0;
      // if (tx || ty) {
      // return { tx, ty };
      // }
    }
  }
  const gap = options.guideLines?.gap;
  if (options.guideLines?.snap && gap) {
    const tx = roundToMultiple(mouse.x, gap) - mouse.x;
    const ty = roundToMultiple(mouse.y, gap) - mouse.y;
    return { tx, ty };
  }

  return { tx: 0, ty: 0 };
};
