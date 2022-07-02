import { nodeCoordsInEditor, nodeSize } from '../utils';
import {
  furtherGuideLineCoords,
  getInitialElementGuideLines,
  isGuideLineFinite,
} from './guideLines';
import { SidesX, SidesY } from '../../enums/dragImage';
import { getAlignedElements } from './alignedElements';
import {
  keyCoords,
  offsetX,
  offsetY,
  infiniteTranslate,
  zeroTranslate,
} from './generators';
import type {
  AlignedElement,
  DragImageTranslate,
  ElementGuideLines,
} from '../../types/dragImage';

import { roundToMultiple } from '@pp-master-thesis/utils';
import type { SvgEditorOptions, ZoomableRef } from '@pp-master-thesis/types';

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
      const alignedElements = getAlignedElements(
        mouse.x - elementX,
        mouse.y - elementY,
        elementWidth,
        elementHeight || elementWidth,
        dragImageWidth,
        dragImageHeight,
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

const elementsSnapTranslate = (
  mouse: DOMPointReadOnly,
  elements: SVGElement[],
  dragImage: Element,
  snapRadius = 0
): DragImageTranslate => {
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
      const guideLine = farthestElements[key];
      if (guideLine) {
        const { isX, isY } = keyCoords(key);
        if (acc.guideLines && isGuideLineFinite(guideLine))
          acc.guideLines[key] = guideLine;
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
          guideLines: acc.guideLines,
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
 * Also returns guide lines coords, if there are any.
 */
export const dragImageTranslate = (
  mouse: DOMPointReadOnly,
  dragImage: Element,
  options: SvgEditorOptions,
  elementsWrapper: SVGGraphicsElement
): DragImageTranslate => {
  const elementsTranslate = options.elements?.snap
    ? elementsSnapTranslate(
        mouse,
        Array.from(elementsWrapper?.children || []) as SVGElement[],
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
    guideLines: elementsTranslate.guideLines,
  };
};
