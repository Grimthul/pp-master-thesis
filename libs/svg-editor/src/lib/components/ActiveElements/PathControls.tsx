import * as React from 'react';

import * as Path from '../../shapes/path';
import type { PropsActiveElement } from '../../types';

import { strokeWidthByZoom } from '@pp-master-thesis/utils';
import { Tool } from '@pp-master-thesis/enums';
import { dragElementTranslate } from '../../utils';

export const PathControls = ({
  element,
  zoomable,
  zoom,
  tool,
  options,
  setTool,
}: PropsActiveElement) => {
  const [pointIndex, setPointIndex] = React.useState<number>(-1);
  const strokeWidth = strokeWidthByZoom(zoom);
  const circleStrokeWidth = 4 * strokeWidth;
  const fill = React.useMemo(() => '#d17127', []);

  const [pathPoints, setPathPoints] = React.useState(() =>
    Path.pathPoints(element.getAttribute('d') || '')
  );

  React.useEffect(() => {
    setPathPoints(Path.pathPoints(element.getAttribute('d') || ''));
  }, [element]);

  React.useEffect(() => {
    if (pointIndex >= 0)
      element.setAttribute(
        'd',
        pathPoints.map(Path.pathPointToString).join(' ')
      );
  }, [element, pathPoints, pointIndex]);

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent, index: number) => {
      if (!zoomable) return;
      setTool(Tool.PATH_MOVE_POINT);
      if (event.shiftKey) {
        const { x, y } = zoomable.getMousePoint(event);
        if (index === 0) {
          setPathPoints((prevPoints) => [
            { command: 'M', x, y },
            ...prevPoints.map((prevPoint, i) =>
              i === 0 ? { ...prevPoint, command: 'L' } : prevPoint
            ),
          ]);
          setPointIndex(index);
          return;
        }
        if (index === pathPoints.length - 1) {
          setPathPoints((prevPoints) => [
            ...prevPoints,
            { command: 'L', x, y },
          ]);
          setPointIndex(index + 1);
          return;
        }
      }
      setPointIndex(index);
    },
    [pathPoints.length, setTool, zoomable]
  );

  const onMouseUp = React.useCallback(() => {
    setPointIndex(-1);
    setTool(Tool.NONE);
  }, [setTool]);

  React.useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!zoomable || pointIndex < 0 || tool !== Tool.PATH_MOVE_POINT) return;
      const mouse = zoomable.getMousePoint(event);
      const { tx, ty } = dragElementTranslate(mouse, element, options);

      setPathPoints((prevPoints) => {
        return prevPoints.map((prevPoint, i) =>
          i === pointIndex
            ? { command: prevPoint.command, x: mouse.x + tx, y: mouse.y + ty }
            : prevPoint
        );
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [element, options, pointIndex, tool, zoomable]);

  return (
    <>
      {pathPoints.map((point, i) => {
        const { x, y } = point;
        return (
          <circle
            key={point.x + point.y + i}
            onMouseDown={(event) => onMouseDown(event, i)}
            onMouseUp={onMouseUp}
            r={circleStrokeWidth}
            cx={x}
            cy={y}
            fill={fill}
            style={{ cursor: Tool.PATH_MOVE_POINT }}
          ></circle>
        );
      })}
    </>
  );
};
