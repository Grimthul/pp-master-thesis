import * as React from 'react';
import { ElementGuideLines } from '../types/dragImage';
import { strokeWidthByZoom } from '../utils';

interface Props {
  mouse: DOMPointReadOnly;
  guideLines: ElementGuideLines;
  zoom: number;
}

export const GuideLines = ({
  mouse,
  guideLines,
  zoom,
}: Props): React.ReactElement => {
  const guideLinesKeys = Object.keys(guideLines) as Array<
    keyof ElementGuideLines
  >;

  return (
    <>
      {guideLinesKeys.map((key) => {
        const value = guideLines[key];
        console.log(value);
        return (
          <rect
            key={key}
            width={5}
            height={5}
            stroke={'#d17127d9'}
            strokeWidth={strokeWidthByZoom(zoom)}
          />
        );
      })}
    </>
  );
};
