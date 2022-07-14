import { SvgAttribute } from '@pp-master-thesis/enums';

export interface SvgAttributeWithDefault {
  attribute: SvgAttribute;
  defaultValue: string;
}

export interface DropdownAttributesValues {
  values: string[];
  defaultValue: string;
}

export interface DropdownAttributes {
  [id: string]: DropdownAttributesValues;
}
