import * as React from 'react';
import { mousePointInElementInverted } from '../utils/utils';
import { zoomBy, zoomInStep, zoomOutStep, zoomTo } from '../utils/zoom';

import { resetZoom, identity } from '../utils/matrix';
import type { ZoomableRef } from '@pp-master-thesis/types';
import type { HandlersCommonProps } from '../lib/Zoomable';

interface Props {
  ref: React.ForwardedRef<ZoomableRef>;
  others: HandlersCommonProps;
}

export const useRefHandlers = ({
  ref,
  others: {
    childRef,
    allowZoom,
    minZoom,
    maxZoom,
    step,
    matrix,
    setMatrix,
    wrapperRect,
  },
}: Props) => {
  React.useImperativeHandle(ref, () => ({
    getChild() {
      return childRef.current;
    },
    getMousePoint(event: React.MouseEvent | MouseEvent) {
      if (!wrapperRect || !childRef.current) return new DOMPointReadOnly();
      const { x: childX, y: childY } = childRef.current.getBoundingClientRect();
      const { tx, ty } = {
        tx: childX - wrapperRect.x - matrix.e,
        ty: childY - wrapperRect.y - matrix.f,
      };
      return mousePointInElementInverted(event, wrapperRect, matrix, tx, ty);
    },
    center() {
      setMatrix(
        identity().translate(
          ((wrapperRect?.width || 0) - (childRef.current?.clientWidth || 0)) /
            2,
          ((wrapperRect?.height || 0) - (childRef.current?.clientHeight || 0)) /
            2
        )
      );
    },
    translate(x: number, y: number) {
      setMatrix((matrix) => matrix.translate(x, y));
    },
    resetZoom(): void {
      setMatrix((matrix) => resetZoom(matrix));
    },
    resetView(): void {
      setMatrix(identity);
      this.center();
    },
    zoomIn(): void {
      if (!allowZoom) return;
      setMatrix((matrix) =>
        zoomBy({ matrix, maxZoom, minZoom, zoom: zoomInStep(step) })
      );
    },
    zoomOut(): void {
      if (!allowZoom) return;
      setMatrix((matrix) =>
        zoomBy({ matrix, maxZoom, minZoom, zoom: zoomOutStep(step) })
      );
    },
    zoomTo(zoom: number): void {
      if (!allowZoom) return;
      setMatrix((matrix) => zoomTo({ matrix, maxZoom, minZoom, zoom }));
    },
  }));
};
