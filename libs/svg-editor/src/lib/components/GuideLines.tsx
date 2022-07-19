import * as React from 'react';

import { isCircular, keyCoords, roundToMultiple } from '../utils';

import { strokeWidthByZoom } from '@pp-master-thesis/utils';

import type { ElementGuideLines } from '../types/dragElement';

interface Props {
  mouse: DOMPointReadOnly;
  guideLines: ElementGuideLines;
  dragElement: HTMLDivElement | SVGGraphicsElement;
  zoom: number;
  gridGap?: boolean;
  snapRadius?: number;
}

interface MouseDiffProps {
  mouse: number;
  start: number;
  end: number;
  dragElementSize: number;
}

export const GuideLines = ({
  mouse,
  guideLines,
  dragElement,
  zoom,
  gridGap,
  snapRadius,
}: Props): React.ReactElement => {
  const guideLinesKeys = Object.keys(guideLines) as Array<
    keyof ElementGuideLines
  >;
  const strokeWidth = React.useMemo(() => strokeWidthByZoom(zoom), [zoom]);

  const {
    width,
    height,
    x: elementX,
    y: elementY,
  } = dragElement instanceof SVGGraphicsElement
    ? dragElement.getBBox()
    : { width: 0, height: 0, x: 0, y: 0 };
  const dragElementWidth = dragElement.clientWidth || width;
  const dragElementHeight = dragElement.clientHeight || height;

  const mouseSnap = React.useCallback(
    (coord: number, snapRadius: number, shouldRound?: boolean) =>
      shouldRound && gridGap ? roundToMultiple(coord, snapRadius * 2) : coord,
    [gridGap]
  );

  const mouseDiff = React.useCallback(
    ({ mouse, start, end, dragElementSize }: MouseDiffProps) =>
      mouse > start ? mouse - start : Math.abs(end - mouse - dragElementSize),
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
      dragElementSize: number,
      isGuideLineCoord?: boolean
    ) => (isGuideLineCoord ? start : Math.min(mouse + dragElementSize, start)),
    []
  );

  return (
    <>
      {guideLinesKeys.map((key) => {
        const guideLine = guideLines[key];

        if (!guideLine || !snapRadius) return null;

        const { start, end } = guideLine;
        const { isX, isY } = keyCoords(key);
        const mouseSnapX = mouseSnap(elementX || mouse.x, snapRadius, isY);
        const mouseSnapY = mouseSnap(elementY || mouse.y, snapRadius, isX);

        const width = size(
          {
            mouse: mouseSnapX,
            start: start.x,
            end: end.x,
            dragElementSize: dragElementWidth,
          },
          isX
        );
        const height = size(
          {
            mouse: mouseSnapY,
            start: start.y,
            end: end.y,
            dragElementSize: dragElementHeight,
          },
          isY
        );

        const x = coord(mouseSnapX, start.x, dragElementWidth, isX);
        const y = coord(mouseSnapY, start.y, dragElementHeight, isY);

        return (
          <rect
            key={key}
            x={isCircular(dragElement) && isX ? x - dragElementWidth / 2 : x}
            y={isCircular(dragElement) && isY ? y - dragElementHeight / 2 : y}
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
