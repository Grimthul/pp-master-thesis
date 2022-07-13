import { SvgElementAttribute } from '@pp-master-thesis/enums';

export interface SvgElementAttributes {
  baseAttributes: SvgElementAttribute[];
  additionalAttributes: SvgElementAttribute[];
}

export interface DropdownAttributesValues {
  values: string[];
  defaultValue: string;
}

export interface DropdownAttributes {
  [id: string]: DropdownAttributesValues;
}
