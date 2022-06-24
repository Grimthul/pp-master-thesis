import type { MouseEvent } from 'react';
import type { SvgEditorOptions, ZoomableRef } from '@pp-master-thesis/types';
import { roundToMultiple } from '@pp-master-thesis/utils';

/**
 * Counts the nearest coordinates translation to snap dragImage/Element that
 * will be added onDrop event.
 * Snap is controlled by SvgEditorOptions - it can be either to
 * already present Element in SvgEditor or guideLines.
 * Element snapping has priority.
 */
export const elementSnapTranslate = (
  event: MouseEvent,
  options: SvgEditorOptions,
  zoomable: ZoomableRef
): { tx: number; ty: number } => {
  const mouse = zoomable.getMousePoint(event);

  if (options.snapToElements) {
    // const svgElements = zoomable.getChild()?.children;
  }
  const gap = options.guideLines?.gap;
  if (options.guideLines?.snap && gap) {
    const tx = roundToMultiple(mouse.x, gap) - mouse.x;
    const ty = roundToMultiple(mouse.y, gap) - mouse.y;
    return { tx, ty };
  }

  return { tx: 0, ty: 0 };
};
