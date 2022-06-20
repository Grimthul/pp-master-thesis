import { ZoomOptions } from '@pp-master-thesis/types';
import { Tool } from '@pp-master-thesis/enums';
import * as React from 'react';

export const useOnActionHandlers = (
  { onPanChange, onToolChange, onZoomChange }: ZoomOptions,
  matrix: DOMMatrixReadOnly,
  tool: Tool
) => {
  React.useEffect(() => {
    if (onPanChange) onPanChange(new DOMPointReadOnly(matrix.e, matrix.f));
  }, [matrix.e, matrix.f, onPanChange]);
  React.useEffect(() => {
    if (onToolChange) onToolChange(tool);
  }, [tool, onToolChange]);
  React.useEffect(() => {
    if (onZoomChange) onZoomChange(matrix.a);
  }, [matrix.a, matrix.d, onZoomChange]);
};
