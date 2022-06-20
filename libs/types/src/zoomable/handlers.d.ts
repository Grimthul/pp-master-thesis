import type { MouseEvent } from 'react';

export interface ZoomableRef {
  getChild(): HTMLElement | undefined;
  getMousePoint(event: MouseEvent): DOMPointReadOnly;
  translate(x: number, y: number): void;
  resetZoom(): void;
  resetView(): void;
  zoomIn(): void;
  zoomOut(): void;
  zoomTo(scale: number): void;
}
