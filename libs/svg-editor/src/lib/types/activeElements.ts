import { Tool } from '@pp-master-thesis/enums';
import type { ZoomableRef } from '@pp-master-thesis/types';

export interface PropsCommon {
  zoomable: ZoomableRef | null;
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
  zoom: number;
  tool: Tool;
}

export interface ElementPosition {
  x: number;
  y: number;
}

export interface PropsActiveElement extends PropsCommon {
  element: SVGGraphicsElement;
  elementPosition?: ElementPosition;
}

export interface PropsActiveElements extends PropsCommon {
  elements: SVGGraphicsElement[];
  disableDrag: boolean;
}
export interface CoordsModifier {
  modifierX: number;
  modifierY: number;
}

export interface Control {
  coordsModifier: CoordsModifier;
  direction: CoordsModifier;
}

export interface Controls {
  NW: Control;
  N: Control;
  NE: Control;
  E: Control;
  SE: Control;
  S: Control;
  SW: Control;
  W: Control;
}
