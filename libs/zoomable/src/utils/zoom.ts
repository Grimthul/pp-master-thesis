import * as React from 'react';
import { Matrix } from '@pp-master-thesis/matrix';
import { ZoomDirection } from '@pp-master-thesis/enums';

interface Props {
  matrix: DOMMatrixReadOnly;
  minZoom: number;
  maxZoom: number;
  x?: number;
  y?: number;
}

interface PropsBy extends Props {
  zoom: number;
}

interface PropsTo extends Props {
  zoom: number;
}

const zoomMinMax = (
  matrix: DOMMatrixReadOnly,
  minZoom: number,
  maxZoom: number
): DOMMatrixReadOnly => {
  if (matrix.a < minZoom) return Matrix.zoomTo(matrix, minZoom);
  if (matrix.a > maxZoom) return Matrix.zoomTo(matrix, maxZoom);
  return matrix;
};

const isAtZoom = (matrix: DOMMatrixReadOnly, zoom: number) =>
  zoom === matrix.a && zoom === matrix.d;

export const shouldZoom = (
  matrix: DOMMatrixReadOnly,
  direction: number,
  minZoom: number,
  maxZoom: number
): boolean =>
  !(
    (isAtZoom(matrix, minZoom) && direction < 0) ||
    (isAtZoom(matrix, maxZoom) && direction > 0)
  );

export const zoomDirection = (event: React.WheelEvent): number =>
  event.deltaY < 1 ? ZoomDirection.IN : ZoomDirection.OUT;

export const zoomStep = (step: number, direction: ZoomDirection): number =>
  1 + step * direction;

export const zoomInStep = (step: number): number =>
  zoomStep(step, ZoomDirection.IN);
export const zoomOutStep = (step: number): number =>
  zoomStep(step, ZoomDirection.OUT);

export const zoomTo = ({
  matrix,
  minZoom,
  maxZoom,
  zoom,
  x,
  y,
}: PropsTo): DOMMatrixReadOnly => {
  if (zoom < minZoom) return Matrix.zoomTo(matrix, minZoom, x, y);
  if (zoom > maxZoom) return Matrix.zoomTo(matrix, maxZoom, x, y);
  return Matrix.zoomTo(matrix, zoom, x, y);
};

export const zoomBy = ({
  matrix,
  minZoom,
  maxZoom,
  zoom,
  x,
  y,
}: PropsBy): DOMMatrixReadOnly =>
  zoomMinMax(Matrix.zoom(matrix, zoom, x, y), minZoom, maxZoom);
