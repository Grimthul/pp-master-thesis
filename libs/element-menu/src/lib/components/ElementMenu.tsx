import * as React from 'react';

import { Attributes } from './Attributes';
import { ELEMENT_ATTRIBUTES } from '../element-attributes';

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
  return (
    <div className="element-menu">
      <div>
        {elements.length ? (
          <>
            <h2 className="element-menu__title">Attributes:</h2>
            <Attributes
              attributesWithDefault={
                elements.length > 1
                  ? elements
                      .map((element) => ELEMENT_ATTRIBUTES[element.nodeName])
                      .reduce((a, b) =>
                        a.filter((attr1) =>
                          b.some((attr2) => attr2.attribute === attr1.attribute)
                        )
                      )
                  : ELEMENT_ATTRIBUTES[elements[0].nodeName]
              }
              elements={elements}
              updatedFromOutside={updatedFromOutside}
              setUpdated={setUpdated}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
