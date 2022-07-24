import { Tool } from '@pp-master-thesis/enums';
import type { SvgEditorOptions, ZoomableRef } from '@pp-master-thesis/types';
import React from 'react';
import { ElementGuideLines } from './dragElement';

export interface PropsCommon {
  zoomable: ZoomableRef | null;
  zoom: number;
  tool: Tool;
  options: SvgEditorOptions;
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
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
  activeElements: SVGGraphicsElement[];
  draggedElement: SVGGraphicsElement | undefined;
  setActiveElements: React.Dispatch<React.SetStateAction<SVGGraphicsElement[]>>;
  setDraggedElement: React.Dispatch<
    React.SetStateAction<SVGGraphicsElement | undefined>
  >;
  setGuideLines: React.Dispatch<
    React.SetStateAction<
      | {
          mouse: DOMPointReadOnly;
          guideLines: ElementGuideLines;
        }
      | undefined
    >
  >;
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
