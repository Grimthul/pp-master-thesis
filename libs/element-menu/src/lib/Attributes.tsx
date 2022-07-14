import * as React from 'react';
import {
  COLOR_ATTRIBUTES,
  DROPDOWN_ATTRIBUTES,
  NUMBER_ATTRIBUTES,
  PERCENT_ATTRIBUTES,
} from './element-attributes';
import type { SvgAttributeWithDefault } from './types';

interface CommonProps {
  elements: SVGGraphicsElement[];
  updatedFromOutside: number;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
}

interface Props extends CommonProps {
  attributesWithDefault: SvgAttributeWithDefault[];
}

interface AttributeProps extends CommonProps {
  attributeWithDefault: SvgAttributeWithDefault;
}

// TODO: attributes default values to prevent warnings for "transparent" colors for example

const Attribute = ({
  attributeWithDefault,
  elements,
  updatedFromOutside,
  setUpdated,
}: AttributeProps) => {
  const { attribute, defaultValue } = attributeWithDefault;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isPercent = PERCENT_ATTRIBUTES.includes(attribute);
  const percentModifier = isPercent ? 100 : 1;
  const isColor = COLOR_ATTRIBUTES.includes(attribute);
  const isNumber = NUMBER_ATTRIBUTES.includes(attribute);
  const isDropdown = Object.keys(DROPDOWN_ATTRIBUTES).includes(attribute);
  const suffix = isPercent ? '%' : '';
  const type = isNumber ? 'number' : isColor ? 'color' : undefined;

  const elementsValues = React.useCallback(
    (elements: SVGGraphicsElement[]) =>
      elements.map((element) => {
        const value = element.getAttribute(attribute);
        return value
          ? isColor
            ? value
            : (Number(value) * percentModifier).toString()
          : defaultValue;
      }),
    [attribute, defaultValue, isColor, percentModifier]
  );

  const [values, setValues] = React.useState(elementsValues(elements));

  React.useLayoutEffect(() => {
    setValues(elementsValues(elements));
  }, [elements, elementsValues, updatedFromOutside]);

  React.useEffect(() => {
    values.forEach((value, i) => {
      if (value !== elements[i].getAttribute(attribute) && value !== '') {
        setUpdated((prevValue) => prevValue + 1);
        elements[i].setAttribute(
          attribute,
          isPercent ? (Number(value) / percentModifier).toString() : value
        );
      }
    });
  }, [attribute, elements, isPercent, percentModifier, setUpdated, values]);

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
            // if multiple elements are chosen, show the value only if it is same for all, else show empty field
            value={new Set(values).size > 1 ? '' : values[0]}
            onChange={(event) => {
              event.preventDefault();
              setValues((prevValues) =>
                prevValues.map(() => event.target.value)
              );
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
  attributesWithDefault,
  elements,
  updatedFromOutside,
  setUpdated,
}: Props) => {
  return (
    <>
      {attributesWithDefault.map((attribute, i) => (
        <Attribute
          attributeWithDefault={attribute}
          elements={elements}
          updatedFromOutside={updatedFromOutside}
          setUpdated={setUpdated}
        />
      ))}
    </>
  );
};
