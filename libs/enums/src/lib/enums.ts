export enum Tool {
  NONE = 'NONE',
  PAN = 'MOVE',
  ZOOM = 'ZOOM',
  NW_RESIZE = 'NW-RESIZE',
  SW_RESIZE = 'SW-RESIZE',
  NE_RESIZE = 'NE-RESIZE',
  SE_RESIZE = 'SE-RESIZE',
  W_RESIZE = 'W-RESIZE',
  E_RESIZE = 'E-RESIZE',
  N_RESIZE = 'N-RESIZE',
  S_RESIZE = 'S-RESIZE',
  PATH_MOVE_POINT = 'PATH_MOVE_POINT',
  SELECTING_ELEMENTS = 'SELECTING_ELEMENTS',
}

export enum ZoomDirection {
  IN = 1,
  OUT = -1,
}

export enum GridLinesStyle {
  // DASHED = 'DASHED',
  DOTTED = 'DOTTED',
  LINES = 'LINES',
}

export enum ElementType {
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  RECTANGLE = 'rect',
  PATH = 'path',
}
