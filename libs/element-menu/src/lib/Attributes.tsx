import * as React from 'react';
import {
  COLOR_ATTRIBUTES,
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

  // if multiple elements are chosen, show the value only if it is same for all, else show empty field
  const value = new Set(values).size > 1 ? '' : values[0];

  React.useLayoutEffect(() => {
    setValues(elementsValues(elements));
  }, [elements, elementsValues, updatedFromOutside]);

  React.useEffect(() => {
    elements.forEach((element, i) => {
      if (values[i] !== element.getAttribute(attribute) && values[i] !== '') {
        setUpdated((prevValue) => prevValue + 1);
        element.setAttribute(
          attribute,
          isPercent
            ? (Number(values[i]) / percentModifier).toString()
            : values[i]
        );
      }
    });
  }, [attribute, elements, isPercent, percentModifier, setUpdated, values]);

  return (
    <div className="element-menu__attribute">
      <h3 className="element-menu__attribute-title">{attribute}</h3>
      <input
        ref={inputRef}
        className="element-menu__input"
        type={type}
        value={value}
        onChange={(event) =>
          setValues((prevValues) => prevValues.map(() => event.target.value))
        }
        min={isNumber ? 0 : undefined}
      ></input>
      <div className="element-menu__input-suffix">{suffix}</div>
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
          key={attribute.attribute + i}
          attributeWithDefault={attribute}
          elements={elements}
          updatedFromOutside={updatedFromOutside}
          setUpdated={setUpdated}
        />
      ))}
    </>
  );
};
