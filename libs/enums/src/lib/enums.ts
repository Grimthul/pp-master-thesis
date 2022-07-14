export enum Tool {
  NONE = 'DEFAULT',
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
  PATH_MOVE_POINT = 'CROSSHAIR',
}

export enum ZoomDirection {
  IN = 1,
  OUT = -1,
}

export enum GridLinesStyle {
  DOTTED = 'DOTTED',
  LINES = 'LINES',
  // DASHED = "DASHED" ??
}

export enum ElementType {
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  RECTANGLE = 'rect',
  PATH = 'path',
}
