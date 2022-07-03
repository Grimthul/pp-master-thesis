import { roundToMultiple } from '@pp-master-thesis/utils';
import * as React from 'react';
import { ElementGuideLines, GuideLineCoords } from '../types/dragImage';
import { strokeWidthByZoom } from '../utils';
import { keyCoords } from '../utils/dragImage/generators';

interface Props {
  mouse: DOMPointReadOnly;
  guideLines: ElementGuideLines;
  dragImage: HTMLDivElement;
  zoom: number;
  snapRadius: number;
}

const guideLineDiff = (guideLine: GuideLineCoords | undefined) => ({
  xDiff: Math.abs((guideLine?.start.x || 0) - (guideLine?.end.x || 0)),
  yDiff: Math.abs((guideLine?.start.y || 0) - (guideLine?.end.y || 0)),
});

export const GuideLines = ({
  mouse,
  guideLines,
  dragImage,
  zoom,
  snapRadius,
}: Props): React.ReactElement => {
  const guideLinesKeys = Object.keys(guideLines) as Array<
    keyof ElementGuideLines
  >;
  const strokeWidth = strokeWidthByZoom(zoom);
  const dragImageWidth = dragImage.clientWidth;
  const dragImageHeight = dragImage.clientHeight;

  return (
    <>
      {guideLinesKeys.map((key) => {
        const guideLine = guideLines[key];
        if (!guideLine) return null;

        const { start, end } = guideLine;
        const { isX, isY } = keyCoords(key);
        const mouseSnapX = isX
          ? roundToMultiple(mouse.x, snapRadius * 2)
          : mouse.x;
        const mouseSnapY = isY
          ? roundToMultiple(mouse.y, snapRadius * 2)
          : mouse.y;

        const { xDiff, yDiff } = guideLineDiff(guideLine);
        const mouseXDiff =
          mouseSnapX > start.x
            ? mouseSnapX - start.x
            : Math.abs(end.x - mouseSnapX - dragImageWidth);
        const mouseYDiff =
          mouseSnapY > start.y
            ? mouseSnapY - start.y
            : Math.abs(end.y - mouseSnapY - dragImageHeight);

        const width = isX ? strokeWidth : Math.max(mouseXDiff, xDiff);
        const height = isY ? strokeWidth : Math.max(mouseYDiff, yDiff);

        const x = isX
          ? guideLine?.start.x
          : Math.min(mouseSnapX + dragImageWidth, Number(guideLine?.start.x));
        const y = isY
          ? guideLine?.start.y
          : Math.min(mouseSnapY + dragImageHeight, Number(guideLine?.start.y));

        // console.log(key, guideLine, xDiff, yDiff, mouseSnapX, mouseXDiff);

        return (
          <rect
            key={key}
            x={x}
            y={y}
            width={width}
            height={height}
            fill="transparent"
            stroke={'#d17127d9'}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </>
  );
};
