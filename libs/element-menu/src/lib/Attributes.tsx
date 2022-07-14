import * as React from 'react';
import { SvgElementAttribute } from '@pp-master-thesis/enums';
import {
  COLOR_ATTRIBUTES,
  DROPDOWN_ATTRIBUTES,
  NUMBER_ATTRIBUTES,
  PERCENT_ATTRIBUTES,
} from './element-attributes';

interface CommonProps {
  element: SVGGraphicsElement;
  updatedFromOutside: number;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
}

interface Props extends CommonProps {
  attributes: SvgElementAttribute[];
}

interface AttributeProps extends CommonProps {
  attribute: SvgElementAttribute;
}

// TODO: attributes default values to prevent warnings for "transparent" colors for example

const Attribute = ({
  attribute,
  element,
  updatedFromOutside,
  setUpdated,
}: AttributeProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isPercent = PERCENT_ATTRIBUTES.includes(attribute);
  const isColor = COLOR_ATTRIBUTES.includes(attribute);
  const isNumber = NUMBER_ATTRIBUTES.includes(attribute);
  const isDropdown = Object.keys(DROPDOWN_ATTRIBUTES).includes(attribute);
  const suffix = isPercent ? '%' : '';
  const type = isNumber ? 'number' : isColor ? 'color' : undefined;

  const [value, setValue] = React.useState(
    () => element.getAttribute(attribute) || (isNumber ? '0' : '')
  );
  React.useLayoutEffect(() => {
    setValue(element.getAttribute(attribute) || '');
  }, [attribute, element, updatedFromOutside]);

  React.useEffect(() => {
    if (
      value !== '0' &&
      value !== '' &&
      value !== element.getAttribute(attribute)
    ) {
      setUpdated((prevValue) => prevValue + 1);
      element.setAttribute(
        attribute,
        isPercent ? (Number(value) / 100).toString() : value
      );
    }
  }, [attribute, element, isPercent, setUpdated, value]);

  return (
    <div className="element-menu__attribute">
      <h3 className="element-menu__attribute-title">{attribute}</h3>
      {isDropdown ? (
        <div className="element-menu__dropdown"></div>
      ) : (
        <>
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={(event) => {
              event.preventDefault();
              setValue(event.target.value);
            }}
            min={isNumber ? 0 : undefined}
            className="element-menu__input"
          ></input>
          <div className="element-menu__input-suffix">{suffix}</div>
        </>
      )}
    </div>
  );
};

export const Attributes = ({
  attributes,
  element,
  updatedFromOutside,
  setUpdated,
}: Props) => {
  return (
    <>
      {attributes.map((attribute, i) => (
        <Attribute
          attribute={attribute}
          element={element}
          updatedFromOutside={updatedFromOutside}
          setUpdated={setUpdated}
        />
      ))}
    </>
  );
};
