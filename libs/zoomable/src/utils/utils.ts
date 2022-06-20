import * as React from 'react';
import {
  OnPanChange,
  OnToolChange,
  OnZoomChange,
  ZoomOptions,
} from '@pp-master-thesis/types';

export const minmax = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

interface ZoomOptionsAll {
  allowZoom: boolean;
  allowPan: boolean;
  step: number;
  minZoom: number;
  maxZoom: number;
  onZoomChange?: OnZoomChange;
  onPanChange?: OnPanChange;
  onToolChange?: OnToolChange;
}

export const mergeWithDefaultOptions = (
  options: ZoomOptions
): ZoomOptionsAll => ({
  allowZoom: true,
  allowPan: true,
  step: 0.1,
  minZoom: 0.01,
  maxZoom: Infinity,
  onPanChange: undefined,
  onToolChange: undefined,
  onZoomChange: undefined,
  ...options,
});

export const mousePointInElement = (
  e: React.MouseEvent,
  elementRect: DOMRect
): DOMPointReadOnly =>
  new DOMPointReadOnly(
    e.clientX - Math.round(elementRect.left),
    e.clientY - Math.round(elementRect.top)
  );

export const invertMousePointInElement = (
  point: DOMPointReadOnly,
  matrix: DOMMatrixReadOnly,
  tx = 0,
  ty = 0
): DOMPointReadOnly =>
  point
    .matrixTransform(new DOMMatrixReadOnly().translate(-tx, -ty))
    .matrixTransform(matrix.inverse());

export const mousePointInElementInverted = (
  e: React.MouseEvent,
  elementRect: DOMRect,
  matrix: DOMMatrixReadOnly,
  tx = 0,
  ty = 0
): DOMPointReadOnly =>
  invertMousePointInElement(
    mousePointInElement(e, elementRect),
    matrix,
    tx,
    ty
  );
