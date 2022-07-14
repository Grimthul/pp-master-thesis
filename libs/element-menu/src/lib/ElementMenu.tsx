import * as React from 'react';
import { Attributes } from './Attributes';
import { ELEMENT_ATTRIBUTES } from './element-attributes';

import type { SvgAttributeWithDefault } from './types';

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
  const attributes: SvgAttributeWithDefault[] = [
    ...new Set(
      elements.flatMap((element) => ELEMENT_ATTRIBUTES[element.nodeName])
    ),
  ];

  return (
    <div className="element-menu">
      <div>
        {elements && (
          <>
            <h2 className="element-menu__title">Attributes:</h2>
            <Attributes
              attributesWithDefault={attributes}
              elements={elements}
              updatedFromOutside={updatedFromOutside}
              setUpdated={setUpdated}
            />
          </>
        )}
      </div>
    </div>
  );
};
