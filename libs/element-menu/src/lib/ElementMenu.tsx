import * as React from 'react';
import { Attributes } from './Attributes';
import { ELEMENT_ATTRIBUTES } from './element-attributes';
import type { SvgElementAttributes } from './types';

import './ElementMenu.scss';

interface Props {
  elements: SVGGraphicsElement[];
}

export function ElementMenu({ elements }: Props) {
  React.useEffect(() => {
    console.log('menu', elements);
  }, [elements]);

  // when elements is empty, maybe use the svg attributes?
  // when elements is populated with more than 1 element, use their intersection?
  const attributes: SvgElementAttributes =
    elements.length === 1
      ? ELEMENT_ATTRIBUTES[elements[0].nodeName]
      : { baseAttributes: [], additionalAttributes: [] };
  // const attributes = defAttributes && {
  //   baseAttrs: defAttributes.baseAttrs,
  //   additionalAttrs: filterArray(
  //     union(
  //       defAttributes.additionalAttrs,
  //       getAttrNames(active?.attributes) || []
  //     ),
  //     defAttributes.baseAttrs
  //   ),
  // };

  return (
    <div className="element-menu">
      <div>
        <h2>Attributes:</h2>
        <Attributes attributes={attributes.baseAttributes} />
      </div>
      <div>
        <h2>Additional Attributes:</h2>
        <Attributes attributes={attributes.additionalAttributes} />
      </div>
    </div>
  );
}

export default ElementMenu;
