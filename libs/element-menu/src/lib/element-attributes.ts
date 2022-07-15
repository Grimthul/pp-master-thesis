import type { SvgAttributeWithDefault } from './types';

import { SvgAttribute } from '@pp-master-thesis/enums';

export const PERCENT_ATTRIBUTES = [
  SvgAttribute.FILL_OPACITY,
  SvgAttribute.OPACITY,
];
export const NUMBER_ATTRIBUTES = [
  SvgAttribute.CX,
  SvgAttribute.CY,
  SvgAttribute.DISPLAY,
  SvgAttribute.DX,
  SvgAttribute.DY,
  SvgAttribute.FILL_OPACITY,
  SvgAttribute.HEIGHT,
  SvgAttribute.OPACITY,
  SvgAttribute.R,
  SvgAttribute.RX,
  SvgAttribute.RY,
  SvgAttribute.SCALE,
  SvgAttribute.WIDTH,
  SvgAttribute.X,
  SvgAttribute.Y,
];
export const COLOR_ATTRIBUTES = [
  SvgAttribute.COLOR,
  SvgAttribute.FILL,
  SvgAttribute.STROKE,
];

const COMMON_ATTRIBUTES: SvgAttributeWithDefault[] = [
  { attribute: SvgAttribute.STROKE, defaultValue: '' },
  { attribute: SvgAttribute.FILL, defaultValue: '' },
  { attribute: SvgAttribute.OPACITY, defaultValue: '100' },
  { attribute: SvgAttribute.FILL_OPACITY, defaultValue: '0' },
];

const CIRCULAR_ATTRIBUTES: SvgAttributeWithDefault[] = [
  { attribute: SvgAttribute.CX, defaultValue: '1' },
  { attribute: SvgAttribute.CY, defaultValue: '1' },
  ...COMMON_ATTRIBUTES,
  { attribute: SvgAttribute.FILL_OPACITY, defaultValue: '0' },
];

const COORDS_ATTRIBUTES: SvgAttributeWithDefault[] = [
  { attribute: SvgAttribute.X, defaultValue: '0' },
  { attribute: SvgAttribute.Y, defaultValue: '0' },
];

const RADIUS_ATTRIBUTES: SvgAttributeWithDefault[] = [
  { attribute: SvgAttribute.RX, defaultValue: '0' },
  { attribute: SvgAttribute.RY, defaultValue: '0' },
];

export const ELEMENT_ATTRIBUTES: { [id: string]: SvgAttributeWithDefault[] } = {
  circle: [
    { attribute: SvgAttribute.R, defaultValue: '1' },
    ...CIRCULAR_ATTRIBUTES,
  ],

  ellipse: [...RADIUS_ATTRIBUTES, ...CIRCULAR_ATTRIBUTES],

  path: [...COMMON_ATTRIBUTES],

  rect: [
    ...COORDS_ATTRIBUTES,
    { attribute: SvgAttribute.WIDTH, defaultValue: '1' },
    { attribute: SvgAttribute.HEIGHT, defaultValue: '1' },
    ...RADIUS_ATTRIBUTES,
    ...COMMON_ATTRIBUTES,
  ],
  image: [...COORDS_ATTRIBUTES],
};
