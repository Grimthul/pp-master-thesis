import type { MouseEvent } from 'react';
import type { SvgEditorOptions, ZoomableRef } from '@pp-master-thesis/types';

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

  if (options.guideLines?.snap) {
    console.log(
      mouse,
      options.guideLines.gap,
      Math.round(mouse.x / (options.guideLines?.gap || 1))
    );
    return { tx: 0, ty: 0 };
  }

  return { tx: 0, ty: 0 };
};
