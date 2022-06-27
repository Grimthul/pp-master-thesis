import type { MouseEvent } from 'react';

import { nodeCoords, nodeCoordsInEditor, nodeSize } from './utils';

import { roundToMultiple } from '@pp-master-thesis/utils';

import type { SvgEditorOptions, ZoomableRef } from '@pp-master-thesis/types';

// interface ElementGuideLinesLength {
//   leftUp?: Element;
//   leftDown?: Element;
//   middleXUp?: Element;
//   middleXDown?: Element;
//   rightUp?: Element;
//   rightDown?: Element;
//   topLeft?: Element;
//   topRight?: Element;
//   middleYLeft?: Element;
//   middleYRight?: Element;
//   bottomLeft?: Element;
//   bottomRight?: Element;
// }

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

const INITIAL_GUIDE_LINES_COORDS: GuideLineCoords = {
  start: new DOMPointReadOnly(Infinity, Infinity),
  end: new DOMPointReadOnly(-Infinity, -Infinity),
};
const INITIAL_ELEMENT_GUIDE_LINES: ElementGuideLines = {
  left: INITIAL_GUIDE_LINES_COORDS,
  middleX: INITIAL_GUIDE_LINES_COORDS,
  right: INITIAL_GUIDE_LINES_COORDS,
  bottom: INITIAL_GUIDE_LINES_COORDS,
  middleY: INITIAL_GUIDE_LINES_COORDS,
  top: INITIAL_GUIDE_LINES_COORDS,
};

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

// const asdasd = (
//   diff: number,
//   elementSize: number,
//   dragImageSize: number,
//   snapRadius: number
// ): ElementGuideLinesLength => {
//   const isInSnapRadius = isInBounds(snapRadius);

//   if (
//     isInSnapRadius(diff) ||
//     isInSnapRadius(diff - elementSize / 2) ||
//     isInSnapRadius(diff - elementSize)
//   ) {
//     console.log('left');
//   }

//   if (
//     isInSnapRadius(diff + dragImageSize / 2) ||
//     isInSnapRadius(diff + dragImageSize / 2 - elementSize / 2) ||
//     isInSnapRadius(diff + dragImageSize / 2 - elementSize)
//   ) {
//     console.log('middleX');
//   }

//   if (
//     isInSnapRadius(diff + dragImageSize) ||
//     isInSnapRadius(diff + dragImageSize - elementSize / 2) ||
//     isInSnapRadius(diff + dragImageSize - elementSize)
//   ) {
//     console.log('right');
//   }
//   return {};
// };

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
}) => {
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
  {
    elementWidth = 0,
    elementHeight = 0,
  }: { elementWidth?: number; elementHeight?: number },
  { valX, valY }: { valX: number; valY: number }
): GuideLineCoords => {
  const { x: startX, y: startY } = current.start;
  const { x: endX, y: endY } = current.end;
  const newStartX = Math.min(startX, valX);
  const newStartY = Math.min(startY, valY);
  const newEndX = Math.max(endX, valX + elementWidth);
  const newEndY = Math.max(endY, valY + elementHeight);
  return {
    start: new DOMPointReadOnly(newStartX, newStartY),
    end: new DOMPointReadOnly(newEndX, newEndY),
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
      const { width: elementWidth, height: elementHeight } =
        element.getBoundingClientRect();
      console.dir(element);
      return elementWidth || elementHeight;
    })
    .reduce((acc: ElementGuideLines, element) => {
      const { x: elementX, y: elementY } = nodeCoordsInEditor(element);
      const { width: elementWidth, height: elementHeight } = nodeSize(element);
      console.log(elementHeight);

      const { left, middleX, right, bottom, middleY, top } = getAlignedElements(
        {
          xDiff: mouse.x - elementX,
          yDiff: mouse.y - elementY,
          dragImageWidth,
          dragImageHeight,
          elementWidth,
          elementHeight,
          snapRadius,
        }
      );
      console.log(left, middleX, right);
      return {
        left: left
          ? {
              ...furtherGuideLineCoords(
                acc.left,
                { elementHeight: elementHeight || elementWidth },
                {
                  valX: mouse.x,
                  valY: elementY,
                }
              ),
            }
          : acc.left,
        middleX: middleX
          ? furtherGuideLineCoords(
              acc.middleX,
              { elementHeight: elementHeight || elementWidth },
              {
                valX: mouse.x + dragImageWidth / 2,
                valY: elementY,
              }
            )
          : acc.middleX,
        right: right
          ? furtherGuideLineCoords(
              acc.right,
              { elementHeight: elementHeight || elementWidth },
              {
                valX: mouse.x + dragImageWidth,
                valY: elementY,
              }
            )
          : acc.right,
        top: top
          ? furtherGuideLineCoords(
              acc.top,
              { elementWidth },
              {
                valX: elementX,
                valY: mouse.y,
              }
            )
          : acc.top,
        middleY: middleY
          ? furtherGuideLineCoords(
              acc.middleY,
              { elementWidth },
              {
                valX: elementX,
                valY: mouse.y + dragImageHeight / 2,
              }
            )
          : acc.middleY,
        bottom: bottom
          ? furtherGuideLineCoords(
              acc.bottom,
              { elementWidth },
              {
                valX: elementX,
                valY: mouse.y + dragImageHeight,
              }
            )
          : acc.bottom,
      };
    }, INITIAL_ELEMENT_GUIDE_LINES);
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
