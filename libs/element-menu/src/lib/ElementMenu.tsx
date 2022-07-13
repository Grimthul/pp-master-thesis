import * as React from 'react';
import { Attributes } from './Attributes';
import { ELEMENT_ATTRIBUTES } from './element-attributes';
import type { SvgElementAttributes } from './types';

import './ElementMenu.scss';

interface Props {
  elements: SVGGraphicsElement[];
  updatedFromOutside: number;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
}

export const ElementMenu = ({
  elements,
  updatedFromOutside,
  setUpdated,
}: Props) => {
  const element = elements.length === 1 ? elements[0] : undefined;

  // when elements is empty, maybe use the svg attributes?
  // when elements is populated with more than 1 element, use their intersection?
  const attributes: SvgElementAttributes = element
    ? ELEMENT_ATTRIBUTES[elements[0].nodeName]
    : { baseAttributes: [], additionalAttributes: [] };

  return (
    <div className="element-menu">
      <div>
        {element && (
          <>
            <h2 className="element-menu__title">Attributes:</h2>
            <Attributes
              attributes={attributes.baseAttributes}
              element={element}
              updatedFromOutside={updatedFromOutside}
              setUpdated={setUpdated}
            />
          </>
        )}
      </div>
    </div>
  );
};
