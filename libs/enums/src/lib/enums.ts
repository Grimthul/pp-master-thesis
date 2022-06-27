export enum Tool {
  NONE = 'DEFAULT',
  PAN = 'MOVE',
  ZOOM = 'ZOOM',
}

export enum ZoomDirection {
  IN = 1,
  OUT = -1,
}

export enum GuideLinesStyle {
  DOTTED = 'DOTTED',
  LINES = 'LINES',
  // DASHED = "DASHED" ??
}

export enum ElementType {
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  RECTANGLE = 'rect',
  TEXT = 'text',
  PATH = 'path',
}
