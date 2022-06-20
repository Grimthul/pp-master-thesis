export const identity = (): DOMMatrixReadOnly =>
  new DOMMatrixReadOnly([1, 0, 0, 1, 0, 0]);

export const zoom = (
  matrix: DOMMatrixReadOnly,
  zoom: number,
  x = 0,
  y = 0
): DOMMatrixReadOnly =>
  matrix.translate(x, y).scale(zoom, zoom).translate(-x, -y);

export const zoomTo = (
  matrix: DOMMatrixReadOnly,
  scale: number,
  x?: number,
  y?: number
): DOMMatrixReadOnly => {
  const { b, c, e, f } = matrix;
  return new DOMMatrixReadOnly([scale, b, c, scale, x ?? e, y ?? f]);
};

export const resetZoom = (matrix: DOMMatrixReadOnly): DOMMatrixReadOnly =>
  zoomTo(matrix, 1);
