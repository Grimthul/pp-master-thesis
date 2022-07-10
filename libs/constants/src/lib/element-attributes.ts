import { SvgElementAttribute } from '@pp-master-thesis/enums';

interface SvgElementAttributes {
  baseAttrs: SvgElementAttribute[];
  additionalAttrs: SvgElementAttribute[];
}

interface DropdownAttributesValues {
  values: string[];
  defaultVal: string;
}

interface DropdownAttributes {
  [id: string]: DropdownAttributesValues;
}

export const percentAttrs = [
  SvgElementAttribute.FILL_OPACITY,
  SvgElementAttribute.STOP_OPACITY,
];
export const numberAttrs = [
  SvgElementAttribute.AMPLITUDE,
  SvgElementAttribute.AZIMUTH,
  SvgElementAttribute.BASE_FREQUENCY,
  SvgElementAttribute.BIAS,
  SvgElementAttribute.DIFFUSE_CONSTANT,
  SvgElementAttribute.DIVISOR,
  SvgElementAttribute.ELEVATION,
  SvgElementAttribute.EXPONENT,
  SvgElementAttribute.FLOOD_OPACITY,
  SvgElementAttribute.FONT_SIZE_ADJUST,
  SvgElementAttribute.INTERCEPT,
  SvgElementAttribute.K1,
  SvgElementAttribute.K2,
  SvgElementAttribute.K3,
  SvgElementAttribute.K4,
  SvgElementAttribute.LIMITING_CONE_ANGLE,
  SvgElementAttribute.NUM_OCTAVES,
  SvgElementAttribute.OPACITY,
  SvgElementAttribute.OVERLINE_POSITION,
  SvgElementAttribute.OVERLINE_THICKNESS,
  SvgElementAttribute.PATH_LENGTH,
  SvgElementAttribute.POINTS_AT_X,
  SvgElementAttribute.POINTS_AT_Y,
  SvgElementAttribute.POINTS_AT_Z,
  SvgElementAttribute.ROTATE,
  SvgElementAttribute.SCALE,
  SvgElementAttribute.SEED,
  SvgElementAttribute.SPECULAR_CONSTANT,
  SvgElementAttribute.SPECULAR_EXPONENT,
  SvgElementAttribute.STRIKETHROUGH_POSITION,
  SvgElementAttribute.STRIKETHROUGH_THICKNESS,
  SvgElementAttribute.STROKE_MITERLIMIT,
  SvgElementAttribute.SURFACE_SCALE,
  SvgElementAttribute.TABINDEX,
  SvgElementAttribute.TARGET_X,
  SvgElementAttribute.TARGET_Y,
  SvgElementAttribute.TO,
  SvgElementAttribute.UNDERLINE_POSITION,
  SvgElementAttribute.UNDERLINE_THICKNESS,
  SvgElementAttribute.Z,
];
export const inputAttrs = [
  SvgElementAttribute.ATTRIBUTE_NAME,
  SvgElementAttribute.BEGIN,
  SvgElementAttribute.BY,
  SvgElementAttribute.CALC_MODE,
  SvgElementAttribute.CLASS,
  SvgElementAttribute.CLIP_PATH,
  SvgElementAttribute.CX,
  SvgElementAttribute.CY,
  SvgElementAttribute.D,
  SvgElementAttribute.DISPLAY,
  SvgElementAttribute.DX,
  SvgElementAttribute.DY,
  SvgElementAttribute.END,
  SvgElementAttribute.FILTER,
  SvgElementAttribute.FONT_SIZE,
  SvgElementAttribute.FROM,
  SvgElementAttribute.FX,
  SvgElementAttribute.FY,
  SvgElementAttribute.HREF,
  SvgElementAttribute.HEIGHT,
  SvgElementAttribute.ID,
  SvgElementAttribute.KERNEL_MATRIX,
  SvgElementAttribute.KEY_POINTS,
  SvgElementAttribute.KEY_SPLINES,
  SvgElementAttribute.KEY_TIMES,
  SvgElementAttribute.LANG,
  SvgElementAttribute.MARKER_END,
  SvgElementAttribute.MARKER_MID,
  SvgElementAttribute.MARKER_START,
  SvgElementAttribute.MARKER_HEIGHT,
  SvgElementAttribute.MARKER_WIDTH,
  SvgElementAttribute.MASK,
  SvgElementAttribute.MAX,
  SvgElementAttribute.MEDIA,
  SvgElementAttribute.MIN,
  SvgElementAttribute.MODE,
  SvgElementAttribute.ORDER,
  SvgElementAttribute.PATH,
  SvgElementAttribute.PATTERN_TRANSFORM,
  SvgElementAttribute.POINTS,
  SvgElementAttribute.R,
  SvgElementAttribute.RADIUS,
  SvgElementAttribute.RESULT,
  SvgElementAttribute.RX,
  SvgElementAttribute.RY,
  SvgElementAttribute.START_OFFSET,
  SvgElementAttribute.STD_DEVIATION,
  SvgElementAttribute.STROKE_DASHARRAY,
  SvgElementAttribute.STROKE_DASHOFFSET,
  SvgElementAttribute.STROKE_OPACITY,
  SvgElementAttribute.STROKE_WIDTH,
  SvgElementAttribute.STYLE,
  SvgElementAttribute.SYSTEM_LANGUAGE,
  SvgElementAttribute.TABLE_VALUES,
  SvgElementAttribute.TEXT_DECORATION,
  SvgElementAttribute.TEXT_LENGTH,
  SvgElementAttribute.TRANSFORM,
  SvgElementAttribute.TRANSFORM_ORIGIN,
  SvgElementAttribute.TYPE,
  SvgElementAttribute.VALUES,
  SvgElementAttribute.VIEW_BOX,
  SvgElementAttribute.WIDTH,
  SvgElementAttribute.X,
  SvgElementAttribute.X1,
  SvgElementAttribute.X2,
  SvgElementAttribute.XML_LANG,
  SvgElementAttribute.Y,
  SvgElementAttribute.Y1,
  SvgElementAttribute.Y2,
];
export const colorAttrs = [
  SvgElementAttribute.COLOR,
  SvgElementAttribute.FILL,
  SvgElementAttribute.FLOOD_COLOR,
  SvgElementAttribute.LIGHTING_COLOR,
  SvgElementAttribute.STROKE,
];

export const dropdownAttrs: DropdownAttributes = {
  [SvgElementAttribute.ACCUMULATE]: {
    values: ['', 'none', 'sum'],
    defaultVal: '',
  },
  [SvgElementAttribute.ADDITIVE]: { values: [''], defaultVal: '' },
  [SvgElementAttribute.ALIGNMENT_BASELINE]: { values: [''], defaultVal: '' },
  [SvgElementAttribute.BASELINE_SHIFT]: { values: [''], defaultVal: '' },
  [SvgElementAttribute.CLIP_PATH_UNITS]: { values: [''], defaultVal: '' },
  [SvgElementAttribute.CLIP_RULE]: { values: [''], defaultVal: '' },
  [SvgElementAttribute.COLOR_INTERPOLATION]: {
    values: [''],
    defaultVal: '',
  },
  [SvgElementAttribute.COLOR_INTERPOLATION_FILTERS]: {
    values: [''],
    defaultVal: '',
  },
  [SvgElementAttribute.CROSSORIGIN]: { values: [''], defaultVal: '' },
  [SvgElementAttribute.CURSOR]: { values: [''], defaultVal: '' },
  [SvgElementAttribute.DIRECTION]: {
    values: ['', 'ltr', 'rtl'],
    defaultVal: '',
  },
  [SvgElementAttribute.DOMINANT_BASELINE]: {
    values: [
      '',
      'auto',
      'text-bottom',
      'alphabetic',
      'ideographic',
      'middle',
      'central',
      'mathematical',
      'hanging',
      'text-top',
    ],
    defaultVal: '',
  },
  [SvgElementAttribute.DUR]: {
    values: ['', 'media', 'indefinite'],
    defaultVal: '',
  },
  [SvgElementAttribute.EDGEMODE]: {
    values: ['', 'duplicate', 'wrap', 'none'],
    defaultVal: '',
  },
  [SvgElementAttribute.FILL_RULE]: {
    values: ['', 'nonzero', 'evenodd'],
    defaultVal: '',
  },
  [SvgElementAttribute.FILTER_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultVal: '',
  },
  [SvgElementAttribute.FONT_FAMILY]: {
    values: ['', 'sans-serif', 'monospace', 'cursive', 'fantasy'],
    defaultVal: '',
  },
  [SvgElementAttribute.FONT_STYLE]: {
    values: ['', 'normal', 'italic', 'oblique'],
    defaultVal: '',
  },
  [SvgElementAttribute.FONT_WEIGHT]: {
    values: ['', 'normal', 'bold', 'bolder', 'lighter'],
    defaultVal: '',
  },
  [SvgElementAttribute.GRADIENT_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultVal: '',
  },
  [SvgElementAttribute.IMAGE_RENDERING]: {
    values: ['', 'auto', 'optimizeSpeed', 'optimizeQuality'],
    defaultVal: '',
  },
  [SvgElementAttribute.LENGTH_ADJUST]: {
    values: ['', 'spacing', 'spacingAndGlyphs'],
    defaultVal: '',
  },
  [SvgElementAttribute.LETTER_SPACING]: {
    values: ['', 'normal'],
    defaultVal: '',
  },
  [SvgElementAttribute.MARKER_UNITS]: {
    values: ['', 'userSpaceOnUse', 'strokeWidth'],
    defaultVal: '',
  },
  [SvgElementAttribute.MASK_CONTENT_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultVal: '',
  },
  [SvgElementAttribute.MASK_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultVal: '',
  },
  [SvgElementAttribute.METHOD]: {
    values: ['', 'align', 'stretch'],
    defaultVal: '',
  },
  [SvgElementAttribute.OPERATOR]: {
    values: ['', 'over', 'in', 'out', 'atop', 'xor', 'lighter', 'arithmetic'],
    defaultVal: '',
  },
  [SvgElementAttribute.ORIENT]: {
    values: ['', 'auto', 'auto-start-reverse'],
    defaultVal: '',
  },
  [SvgElementAttribute.OVERFLOW]: {
    values: ['', 'visible', 'hidden', 'scroll', 'auto'],
    defaultVal: '',
  },
  [SvgElementAttribute.PAINT_ORDER]: {
    values: ['', 'normal', 'fill', 'stroke', 'markers'],
    defaultVal: '',
  },
  [SvgElementAttribute.PATTERN_CONTENT_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultVal: '',
  },
  [SvgElementAttribute.PATTERN_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultVal: '',
  },
  [SvgElementAttribute.POINTER_EVENTS]: {
    values: [
      '',
      'bounding-box',
      'visiblePainted',
      'visibleFill',
      'visibleStroke',
      'visible',
      'painted',
      'fill',
      'stroke',
      'all',
      'none',
    ],
    defaultVal: '',
  },
  [SvgElementAttribute.PRESERVE_ALPHA]: {
    values: ['', 'true', 'false'],
    defaultVal: '',
  },
  [SvgElementAttribute.PRESERVE_ASPECT_RATIO]: {
    values: [
      '',
      'none',
      'xMinYMin',
      'xMidYMin',
      'xMaxYMin',
      'xMinYMid',
      'xMidYMid',
      'xMaxYMid',
      'xMinYMax',
      'xMidYMax',
      'xMaxYMax',
      'meet',
      'slice',
      'xMinYMin meet',
      'xMidYMin meet',
      'xMaxYMin meet',
      'xMinYMid meet',
      'xMidYMid meet',
      'xMaxYMid meet',
      'xMinYMax meet',
      'xMidYMax meet',
      'xMaxYMax meet',
      'xMinYMin slice',
      'xMidYMin slice',
      'xMaxYMin slice',
      'xMinYMid slice',
      'xMidYMid slice',
      'xMaxYMid slice',
      'xMinYMax slice',
      'xMidYMax slice',
      'xMaxYMax slice',
    ],
    defaultVal: '',
  },
  [SvgElementAttribute.PRIMITIVE_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultVal: '',
  },
  [SvgElementAttribute.REF_X]: {
    values: ['', 'left', 'center', 'right'],
    defaultVal: '',
  },
  [SvgElementAttribute.REF_Y]: {
    values: ['', 'top', 'center', 'bottom'],
    defaultVal: '',
  },
  [SvgElementAttribute.REPEAT_COUNT]: {
    values: ['', 'indefinite'],
    defaultVal: '',
  },
  [SvgElementAttribute.REPEAT_DUR]: {
    values: ['', 'indefinite'],
    defaultVal: '',
  },
  [SvgElementAttribute.RESTART]: {
    values: ['', 'always', 'whenNotActive', 'never'],
    defaultVal: '',
  },
  // weird documentation
  // [SvgElementAttribute.ROTATE]: {
  //   values: ["", "auto", "auto-reverse"],
  //   defaultVal: "",
  // },
  // [SvgElementAttribute.RX]: {
  //   values: ["", "auto"],
  //   defaultVal: "",
  // },
  // [SvgElementAttribute.RY]: {
  //   values: ["", "auto"],
  //   defaultVal: "",
  // },
  [SvgElementAttribute.SHAPE_RENDERING]: {
    values: ['', 'auto', 'optimizeSpeed', 'crispEdges', 'geometricPrecision'],
    defaultVal: '',
  },
  [SvgElementAttribute.SPACING]: {
    values: ['', 'auto', 'exact'],
    defaultVal: '',
  },
  [SvgElementAttribute.SPREAD_METHOD]: {
    values: ['', 'pad', 'reflect', 'repeat'],
    defaultVal: '',
  },
  [SvgElementAttribute.STITCH_TILES]: {
    values: ['', 'noStitch', 'stitch'],
    defaultVal: '',
  },
  [SvgElementAttribute.STOP_COLOR]: {
    values: ['', 'currentcolor'],
    defaultVal: '',
  },
  [SvgElementAttribute.STROKE_LINECAP]: {
    values: ['', 'butt', 'round', 'square'],
    defaultVal: '',
  },
  [SvgElementAttribute.STROKE_LINEJOIN]: {
    values: ['', 'arcs', 'bevel', 'miter', 'miter-clip', 'round'],
    defaultVal: '',
  },
  [SvgElementAttribute.TARGET]: {
    values: ['', '_self', '_parent', '_top', '_blank'],
    defaultVal: '',
  },
  [SvgElementAttribute.TEXT_ANCHOR]: {
    values: ['', 'start', 'middle', 'end'],
    defaultVal: '',
  },
  [SvgElementAttribute.TEXT_RENDERING]: {
    values: [
      '',
      'auto',
      'optimizeSpeed',
      'optimizeLegibility',
      'geometricPrecision',
    ],
    defaultVal: '',
  },
  [SvgElementAttribute.UNICODE_BIDI]: {
    values: [
      '',
      'normal',
      'embed',
      'isolate',
      'bidi-override',
      'isolate-override',
      'plaintext',
    ],
    defaultVal: '',
  },
  [SvgElementAttribute.VECTOR_EFFECT]: {
    values: [
      '',
      'none',
      'non-scaling-stroke',
      'non-scaling-size',
      'non-rotation',
      'fixed-position',
    ],
    defaultVal: '',
  },
  [SvgElementAttribute.VISIBILITY]: {
    values: ['', 'visible', 'hidden', 'collapse'],
    defaultVal: '',
  },
  [SvgElementAttribute.WORD_SPACING]: {
    values: ['', 'normal'],
    defaultVal: '',
  },
  [SvgElementAttribute.WRITING_MODE]: {
    values: ['', 'horizontal-tb', 'vertical-rl', 'vertical-lr'],
    defaultVal: '',
  },
  [SvgElementAttribute.X_CHANNEL_SELECTOR]: {
    values: ['', 'R', 'G', 'B', 'A'],
    defaultVal: '',
  },
  [SvgElementAttribute.Y_CHANNEL_SELECTOR]: {
    values: ['', 'R', 'G', 'B', 'A'],
    defaultVal: '',
  },
};

const commonAttrs: SvgElementAttributes = {
  baseAttrs: [SvgElementAttribute.FILL],
  additionalAttrs: [
    SvgElementAttribute.FILL_OPACITY,
    SvgElementAttribute.OPACITY,
  ],
};

const textAttrs: SvgElementAttributes = {
  baseAttrs: [
    SvgElementAttribute.X,
    SvgElementAttribute.Y,
    SvgElementAttribute.FONT_FAMILY,
    SvgElementAttribute.FONT_SIZE,
    ...commonAttrs.baseAttrs,
  ],
  additionalAttrs: [
    SvgElementAttribute.DX,
    SvgElementAttribute.DY,
    SvgElementAttribute.ROTATE,
    SvgElementAttribute.LETTER_SPACING,
    ...commonAttrs.additionalAttrs,
  ],
};

const circularAttributes: SvgElementAttributes = {
  baseAttrs: [
    SvgElementAttribute.CX,
    SvgElementAttribute.CY,
    ...commonAttrs.baseAttrs,
  ],
  additionalAttrs: [
    SvgElementAttribute.PATH_LENGTH,
    ...commonAttrs.additionalAttrs,
  ],
};

const polyAttributes: SvgElementAttributes = {
  baseAttrs: [SvgElementAttribute.POINTS, ...commonAttrs.baseAttrs],
  additionalAttrs: [
    SvgElementAttribute.PATH_LENGTH,
    ...commonAttrs.additionalAttrs,
  ],
};

export const elementAttributes: { [id: string]: SvgElementAttributes } = {
  circle: {
    baseAttrs: [SvgElementAttribute.R, ...circularAttributes.baseAttrs],
    additionalAttrs: [...circularAttributes.additionalAttrs],
  },
  ellipse: {
    baseAttrs: [
      SvgElementAttribute.RX,
      SvgElementAttribute.RY,
      ...circularAttributes.baseAttrs,
    ],
    additionalAttrs: [...circularAttributes.additionalAttrs],
  },
  path: {
    baseAttrs: [...commonAttrs.baseAttrs],
    additionalAttrs: [
      SvgElementAttribute.PATH_LENGTH,
      ...commonAttrs.additionalAttrs,
    ],
  },
  polygon: polyAttributes,
  polyline: polyAttributes,
  rect: {
    baseAttrs: [
      SvgElementAttribute.X,
      SvgElementAttribute.Y,
      SvgElementAttribute.WIDTH,
      SvgElementAttribute.HEIGHT,
      SvgElementAttribute.RX,
      SvgElementAttribute.RY,
      ...commonAttrs.baseAttrs,
    ],
    additionalAttrs: [
      SvgElementAttribute.PATH_LENGTH,
      ...commonAttrs.additionalAttrs,
    ],
  },
  text: textAttrs,
  // textPath:,
  tspan: textAttrs,
};
