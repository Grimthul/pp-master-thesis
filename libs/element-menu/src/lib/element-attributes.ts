import { SvgElementAttribute } from '@pp-master-thesis/enums';
import type { DropdownAttributes, SvgElementAttributes } from './types';

export const PERCENT_ATTRIBUTES = [
  SvgElementAttribute.FILL_OPACITY,
  SvgElementAttribute.OPACITY,
  SvgElementAttribute.STOP_OPACITY,
];
export const NUMBER_ATTRIBUTES = [
  SvgElementAttribute.AMPLITUDE,
  SvgElementAttribute.AZIMUTH,
  SvgElementAttribute.BASE_FREQUENCY,
  SvgElementAttribute.BIAS,
  SvgElementAttribute.DIFFUSE_CONSTANT,
  SvgElementAttribute.DIVISOR,
  SvgElementAttribute.ELEVATION,
  SvgElementAttribute.EXPONENT,
  SvgElementAttribute.FILL_OPACITY,
  SvgElementAttribute.FLOOD_OPACITY,
  SvgElementAttribute.FONT_SIZE_ADJUST,
  SvgElementAttribute.INTERCEPT,
  SvgElementAttribute.HEIGHT,
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
  SvgElementAttribute.RX,
  SvgElementAttribute.RY,
  SvgElementAttribute.SCALE,
  SvgElementAttribute.SEED,
  SvgElementAttribute.SPECULAR_CONSTANT,
  SvgElementAttribute.SPECULAR_EXPONENT,
  SvgElementAttribute.STOP_OPACITY,
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
  SvgElementAttribute.WIDTH,
  SvgElementAttribute.X,
  SvgElementAttribute.Y,
  SvgElementAttribute.Z,
];
export const INPUT_ATTRIBUTES = [
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
  SvgElementAttribute.X1,
  SvgElementAttribute.X2,
  SvgElementAttribute.XML_LANG,
  SvgElementAttribute.Y1,
  SvgElementAttribute.Y2,
];
export const COLOR_ATTRIBUTES = [
  SvgElementAttribute.COLOR,
  SvgElementAttribute.FILL,
  SvgElementAttribute.FLOOD_COLOR,
  SvgElementAttribute.LIGHTING_COLOR,
  SvgElementAttribute.STROKE,
];

export const DROPDOWN_ATTRIBUTES: DropdownAttributes = {
  [SvgElementAttribute.ACCUMULATE]: {
    values: ['', 'none', 'sum'],
    defaultValue: '',
  },
  [SvgElementAttribute.ADDITIVE]: { values: [''], defaultValue: '' },
  [SvgElementAttribute.ALIGNMENT_BASELINE]: { values: [''], defaultValue: '' },
  [SvgElementAttribute.BASELINE_SHIFT]: { values: [''], defaultValue: '' },
  [SvgElementAttribute.CLIP_PATH_UNITS]: { values: [''], defaultValue: '' },
  [SvgElementAttribute.CLIP_RULE]: { values: [''], defaultValue: '' },
  [SvgElementAttribute.COLOR_INTERPOLATION]: {
    values: [''],
    defaultValue: '',
  },
  [SvgElementAttribute.COLOR_INTERPOLATION_FILTERS]: {
    values: [''],
    defaultValue: '',
  },
  [SvgElementAttribute.CROSSORIGIN]: { values: [''], defaultValue: '' },
  [SvgElementAttribute.CURSOR]: { values: [''], defaultValue: '' },
  [SvgElementAttribute.DIRECTION]: {
    values: ['', 'ltr', 'rtl'],
    defaultValue: '',
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
    defaultValue: '',
  },
  [SvgElementAttribute.DUR]: {
    values: ['', 'media', 'indefinite'],
    defaultValue: '',
  },
  [SvgElementAttribute.EDGEMODE]: {
    values: ['', 'duplicate', 'wrap', 'none'],
    defaultValue: '',
  },
  [SvgElementAttribute.FILL_RULE]: {
    values: ['', 'nonzero', 'evenodd'],
    defaultValue: '',
  },
  [SvgElementAttribute.FILTER_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultValue: '',
  },
  [SvgElementAttribute.FONT_FAMILY]: {
    values: ['', 'sans-serif', 'monospace', 'cursive', 'fantasy'],
    defaultValue: '',
  },
  [SvgElementAttribute.FONT_STYLE]: {
    values: ['', 'normal', 'italic', 'oblique'],
    defaultValue: '',
  },
  [SvgElementAttribute.FONT_WEIGHT]: {
    values: ['', 'normal', 'bold', 'bolder', 'lighter'],
    defaultValue: '',
  },
  [SvgElementAttribute.GRADIENT_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultValue: '',
  },
  [SvgElementAttribute.IMAGE_RENDERING]: {
    values: ['', 'auto', 'optimizeSpeed', 'optimizeQuality'],
    defaultValue: '',
  },
  [SvgElementAttribute.LENGTH_ADJUST]: {
    values: ['', 'spacing', 'spacingAndGlyphs'],
    defaultValue: '',
  },
  [SvgElementAttribute.LETTER_SPACING]: {
    values: ['', 'normal'],
    defaultValue: '',
  },
  [SvgElementAttribute.MARKER_UNITS]: {
    values: ['', 'userSpaceOnUse', 'strokeWidth'],
    defaultValue: '',
  },
  [SvgElementAttribute.MASK_CONTENT_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultValue: '',
  },
  [SvgElementAttribute.MASK_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultValue: '',
  },
  [SvgElementAttribute.METHOD]: {
    values: ['', 'align', 'stretch'],
    defaultValue: '',
  },
  [SvgElementAttribute.OPERATOR]: {
    values: ['', 'over', 'in', 'out', 'atop', 'xor', 'lighter', 'arithmetic'],
    defaultValue: '',
  },
  [SvgElementAttribute.ORIENT]: {
    values: ['', 'auto', 'auto-start-reverse'],
    defaultValue: '',
  },
  [SvgElementAttribute.OVERFLOW]: {
    values: ['', 'visible', 'hidden', 'scroll', 'auto'],
    defaultValue: '',
  },
  [SvgElementAttribute.PAINT_ORDER]: {
    values: ['', 'normal', 'fill', 'stroke', 'markers'],
    defaultValue: '',
  },
  [SvgElementAttribute.PATTERN_CONTENT_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultValue: '',
  },
  [SvgElementAttribute.PATTERN_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultValue: '',
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
    defaultValue: '',
  },
  [SvgElementAttribute.PRESERVE_ALPHA]: {
    values: ['', 'true', 'false'],
    defaultValue: '',
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
    defaultValue: '',
  },
  [SvgElementAttribute.PRIMITIVE_UNITS]: {
    values: ['', 'userSpaceOnUse', 'objectBoundingBox'],
    defaultValue: '',
  },
  [SvgElementAttribute.REF_X]: {
    values: ['', 'left', 'center', 'right'],
    defaultValue: '',
  },
  [SvgElementAttribute.REF_Y]: {
    values: ['', 'top', 'center', 'bottom'],
    defaultValue: '',
  },
  [SvgElementAttribute.REPEAT_COUNT]: {
    values: ['', 'indefinite'],
    defaultValue: '',
  },
  [SvgElementAttribute.REPEAT_DUR]: {
    values: ['', 'indefinite'],
    defaultValue: '',
  },
  [SvgElementAttribute.RESTART]: {
    values: ['', 'always', 'whenNotActive', 'never'],
    defaultValue: '',
  },
  // weird documentation
  // [SvgElementAttribute.ROTATE]: {
  //   values: ["", "auto", "auto-reverse"],
  //   defaultValue: "",
  // },
  // [SvgElementAttribute.RX]: {
  //   values: ["", "auto"],
  //   defaultValue: "",
  // },
  // [SvgElementAttribute.RY]: {
  //   values: ["", "auto"],
  //   defaultValue: "",
  // },
  [SvgElementAttribute.SHAPE_RENDERING]: {
    values: ['', 'auto', 'optimizeSpeed', 'crispEdges', 'geometricPrecision'],
    defaultValue: '',
  },
  [SvgElementAttribute.SPACING]: {
    values: ['', 'auto', 'exact'],
    defaultValue: '',
  },
  [SvgElementAttribute.SPREAD_METHOD]: {
    values: ['', 'pad', 'reflect', 'repeat'],
    defaultValue: '',
  },
  [SvgElementAttribute.STITCH_TILES]: {
    values: ['', 'noStitch', 'stitch'],
    defaultValue: '',
  },
  [SvgElementAttribute.STOP_COLOR]: {
    values: ['', 'currentcolor'],
    defaultValue: '',
  },
  [SvgElementAttribute.STROKE_LINECAP]: {
    values: ['', 'butt', 'round', 'square'],
    defaultValue: '',
  },
  [SvgElementAttribute.STROKE_LINEJOIN]: {
    values: ['', 'arcs', 'bevel', 'miter', 'miter-clip', 'round'],
    defaultValue: '',
  },
  [SvgElementAttribute.TARGET]: {
    values: ['', '_self', '_parent', '_top', '_blank'],
    defaultValue: '',
  },
  [SvgElementAttribute.TEXT_ANCHOR]: {
    values: ['', 'start', 'middle', 'end'],
    defaultValue: '',
  },
  [SvgElementAttribute.TEXT_RENDERING]: {
    values: [
      '',
      'auto',
      'optimizeSpeed',
      'optimizeLegibility',
      'geometricPrecision',
    ],
    defaultValue: '',
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
    defaultValue: '',
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
    defaultValue: '',
  },
  [SvgElementAttribute.VISIBILITY]: {
    values: ['', 'visible', 'hidden', 'collapse'],
    defaultValue: '',
  },
  [SvgElementAttribute.WORD_SPACING]: {
    values: ['', 'normal'],
    defaultValue: '',
  },
  [SvgElementAttribute.WRITING_MODE]: {
    values: ['', 'horizontal-tb', 'vertical-rl', 'vertical-lr'],
    defaultValue: '',
  },
  [SvgElementAttribute.X_CHANNEL_SELECTOR]: {
    values: ['', 'R', 'G', 'B', 'A'],
    defaultValue: '',
  },
  [SvgElementAttribute.Y_CHANNEL_SELECTOR]: {
    values: ['', 'R', 'G', 'B', 'A'],
    defaultValue: '',
  },
};

const COMMON_ATTRIBUTES: SvgElementAttributes = {
  baseAttributes: [
    SvgElementAttribute.STROKE,
    SvgElementAttribute.FILL,
    SvgElementAttribute.FILL_OPACITY,
    SvgElementAttribute.OPACITY,
  ],
  additionalAttributes: [
    SvgElementAttribute.FILL_OPACITY,
    SvgElementAttribute.OPACITY,
  ],
};

const TEXT_ATTRIBUTES: SvgElementAttributes = {
  baseAttributes: [
    SvgElementAttribute.X,
    SvgElementAttribute.Y,
    SvgElementAttribute.FONT_FAMILY,
    SvgElementAttribute.FONT_SIZE,
    ...COMMON_ATTRIBUTES.baseAttributes,
  ],
  additionalAttributes: [
    SvgElementAttribute.DX,
    SvgElementAttribute.DY,
    SvgElementAttribute.ROTATE,
    SvgElementAttribute.LETTER_SPACING,
    ...COMMON_ATTRIBUTES.additionalAttributes,
  ],
};

const CIRCULAR_ATTRIBUTES: SvgElementAttributes = {
  baseAttributes: [
    SvgElementAttribute.CX,
    SvgElementAttribute.CY,
    ...COMMON_ATTRIBUTES.baseAttributes,
  ],
  additionalAttributes: [
    // SvgElementAttribute.PATH_LENGTH,
    ...COMMON_ATTRIBUTES.additionalAttributes,
  ],
};

const POLY_ATTRIBUTES: SvgElementAttributes = {
  baseAttributes: [
    SvgElementAttribute.POINTS,
    ...COMMON_ATTRIBUTES.baseAttributes,
  ],
  additionalAttributes: [
    // SvgElementAttribute.PATH_LENGTH,
    ...COMMON_ATTRIBUTES.additionalAttributes,
  ],
};

export const ELEMENT_ATTRIBUTES: { [id: string]: SvgElementAttributes } = {
  circle: {
    baseAttributes: [
      SvgElementAttribute.R,
      ...CIRCULAR_ATTRIBUTES.baseAttributes,
    ],
    additionalAttributes: [...CIRCULAR_ATTRIBUTES.additionalAttributes],
  },
  ellipse: {
    baseAttributes: [
      SvgElementAttribute.RX,
      SvgElementAttribute.RY,
      ...CIRCULAR_ATTRIBUTES.baseAttributes,
    ],
    additionalAttributes: [...CIRCULAR_ATTRIBUTES.additionalAttributes],
  },
  path: {
    baseAttributes: [...COMMON_ATTRIBUTES.baseAttributes],
    additionalAttributes: [
      // SvgElementAttribute.PATH_LENGTH,
      ...COMMON_ATTRIBUTES.additionalAttributes,
    ],
  },
  polygon: POLY_ATTRIBUTES,
  polyline: POLY_ATTRIBUTES,
  rect: {
    baseAttributes: [
      SvgElementAttribute.X,
      SvgElementAttribute.Y,
      SvgElementAttribute.WIDTH,
      SvgElementAttribute.HEIGHT,
      SvgElementAttribute.RX,
      SvgElementAttribute.RY,
      ...COMMON_ATTRIBUTES.baseAttributes,
    ],
    additionalAttributes: [
      // SvgElementAttribute.PATH_LENGTH,
      ...COMMON_ATTRIBUTES.additionalAttributes,
    ],
  },
  text: TEXT_ATTRIBUTES,
  // textPath:,
  tspan: TEXT_ATTRIBUTES,
};
