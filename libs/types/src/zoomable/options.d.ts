import { Tools } from './tools';

export type OnZoomChange = (zoom: number) => void;
export type OnPanChange = (point: DOMPointReadOnly) => void;
export type OnToolChange = (action: Tools) => void;

export interface ZoomOptions {
  allowZoom?: boolean;
  allowPan?: boolean;
  step?: number;
  minZoom?: number;
  maxZoom?: number;
  onZoomChange?: OnZoomChange;
  onPanChange?: OnPanChange;
  onToolChange?: OnToolChange;
}
