import {
  keyCoords,
  nodeCoordsInEditor,
  nodeSize,
  roundToMultiple,
} from '../utils';
import { furtherGuideLineCoords, isGuideLineFinite } from './guideLines';
import { SidesX, SidesY } from '../../enums/dragElement';
import { getAlignedElements } from './alignedElements';
import {
  offsetX,
  offsetY,
  infiniteTranslate,
  zeroTranslate,
  getInitialElementGuideLines,
} from './generators';
import type {
  AlignedElement,
  DragElementTranslate,
  ElementGuideLines,
} from '../../types/dragElement';

import { ElementType } from '@pp-master-thesis/enums';
import type { SvgEditorOptions } from '@pp-master-thesis/types';

// TODO: REFACTOR
/**
 * Returns the farthest elements for each side of given element.
 */
const farthestElementsInAxes = (
  mouse: DOMPointReadOnly,
  snapRadius: number,
  dragElement: Element | SVGGraphicsElement,
  svgElements: SVGGraphicsElement[]
): ElementGuideLines => {
  const { width, height } =
    dragElement instanceof SVGGraphicsElement
      ? dragElement.getBBox()
      : { width: 0, height: 0 };
  const dragElementWidth = dragElement.clientWidth || width;
  const dragElementHeight = dragElement.clientHeight || height;

  return svgElements
    .filter((element) => {
      const node = element.nodeName;
      if (node === ElementType.PATH) return false;
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
        dragElementWidth,
        dragElementHeight,
        snapRadius
      );
      const alignedElementsKeys = Object.keys(alignedElements) as Array<
        keyof AlignedElement
      >;
      /**
       * Processes alignedElements, for each side of dragElement chooses the farthest one.
       */
      return alignedElementsKeys.reduce((updatedGuideLines, key) => {
        if (alignedElements[key]) {
          const { isX, isY } = keyCoords(key);
          const addHeight = isX ? elementHeight || elementWidth : 0;
          const addWidth = isY ? elementWidth : 0;
          const valX = isX
            ? roundToMultiple(
                mouse.x + offsetX(dragElementWidth)[key as SidesX],
                elementWidth / 2,
                elementX
              )
            : elementX;
          const valY = isY
            ? roundToMultiple(
                mouse.y + offsetY(dragElementHeight)[key as SidesY],
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
  elements: SVGGraphicsElement[],
  dragElement: Element,
  snapRadius = 0
): DragElementTranslate => {
  if (elements?.length) {
    const { width, height } =
      dragElement instanceof SVGGraphicsElement
        ? dragElement.getBBox()
        : { width: 0, height: 0 };
    const dragElementWidth = dragElement.clientWidth || width;
    const dragElementHeight = dragElement.clientHeight || height;

    const farthestElements = farthestElementsInAxes(
      mouse,
      snapRadius,
      dragElement,
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
                offsetX(dragElementWidth)[key as SidesX]
              : acc.tx,
          ty:
            isY && !isFinite(acc.ty)
              ? guideLine.start.y -
                mouse.y -
                offsetY(dragElementHeight)[key as SidesY]
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
 * Counts the nearest coordinates translation to snap dragImage that
 * will be added onDrop event or to snap element that is being updated with cursor drag.
 * Snap is controlled by SvgEditorOptions - it can be either to
 * already present Element in SvgEditor or guideLines.
 * Element snapping has priority.
 * Also returns guide lines coords, if there are any.
 */
export const dragElementTranslate = (
  mouse: DOMPointReadOnly,
  dragElement: Element,
  options: SvgEditorOptions,
  elements?: SVGGraphicsElement[]
): DragElementTranslate => {
  const elementsTranslate =
    options.elements?.snap && elements
      ? elementsSnapTranslate(
          mouse,
          elements,
          dragElement,
          options?.elements?.snapRadius
        )
      : infiniteTranslate();

  const gap = options.grid?.gap;
  const gridTranslate =
    options.grid?.snap && gap ? gridSnapTranslate(mouse, gap) : zeroTranslate();
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
