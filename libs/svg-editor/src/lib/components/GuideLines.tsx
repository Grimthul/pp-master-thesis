import * as React from 'react';

import { strokeWidthByZoom, keyCoords } from '../utils';

import { roundToMultiple } from '@pp-master-thesis/utils';

import type { ElementGuideLines } from '../types/dragImage';

interface Props {
  mouse: DOMPointReadOnly;
  guideLines: ElementGuideLines;
  dragImage: HTMLDivElement;
  zoom: number;
  gridGap?: boolean;
  snapRadius?: number;
}

interface MouseDiffProps {
  mouse: number;
  start: number;
  end: number;
  dragImageSize: number;
}

export const GuideLines = ({
  mouse,
  guideLines,
  dragImage,
  zoom,
  gridGap,
  snapRadius,
}: Props): React.ReactElement => {
  const guideLinesKeys = Object.keys(guideLines) as Array<
    keyof ElementGuideLines
  >;
  const strokeWidth = React.useMemo(() => strokeWidthByZoom(zoom), [zoom]);
  const dragImageWidth = dragImage.clientWidth;
  const dragImageHeight = dragImage.clientHeight;

  const mouseSnap = React.useCallback(
    (coord: number, snapRadius: number, shouldRound?: boolean) =>
      shouldRound && gridGap ? roundToMultiple(coord, snapRadius * 2) : coord,
    [gridGap]
  );

  const mouseDiff = React.useCallback(
    ({ mouse, start, end, dragImageSize }: MouseDiffProps) =>
      mouse > start ? mouse - start : Math.abs(end - mouse - dragImageSize),
    []
  );

  const size = React.useCallback(
    (mouseDiffProps: MouseDiffProps, isStrokeWidth?: boolean) => {
      const { start, end } = mouseDiffProps;
      return isStrokeWidth
        ? strokeWidth
        : Math.max(mouseDiff(mouseDiffProps), end - start);
    },
    [mouseDiff, strokeWidth]
  );

  const coord = React.useCallback(
    (
      mouse: number,
      start: number,
      dragImageSize: number,
      isGuideLineCoord?: boolean
    ) => (isGuideLineCoord ? start : Math.min(mouse + dragImageSize, start)),
    []
  );

  return (
    <>
      {guideLinesKeys.map((key) => {
        const guideLine = guideLines[key];
        if (!guideLine || !snapRadius) return null;

        const { start, end } = guideLine;
        const { isX, isY } = keyCoords(key);
        const mouseSnapX = mouseSnap(mouse.x, snapRadius, isY);
        const mouseSnapY = mouseSnap(mouse.y, snapRadius, isX);

        const width = size(
          {
            mouse: mouseSnapX,
            start: start.x,
            end: end.x,
            dragImageSize: dragImageWidth,
          },
          isX
        );
        const height = size(
          {
            mouse: mouseSnapY,
            start: start.y,
            end: end.y,
            dragImageSize: dragImageHeight,
          },
          isY
        );

        const x = coord(mouseSnapX, start.x, dragImageWidth, isX);
        const y = coord(mouseSnapY, start.y, dragImageHeight, isY);

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
