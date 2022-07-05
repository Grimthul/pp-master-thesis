import type { MouseEvent } from 'react';

export type GetMousePoint = (event: MouseEvent) => DOMPointReadOnly;

export interface ZoomableRef {
  getChild(): HTMLElement | undefined;
  getMousePoint: GetMousePoint;
  translate(x: number, y: number): void;
  resetZoom(): void;
  resetView(): void;
  zoomIn(): void;
  zoomOut(): void;
  zoomTo(scale: number): void;
}
