import * as React from 'react';

import * as Path from '../../shapes/path';
import type { PropsActiveElement, PathPoint } from '../../types';

import { strokeWidthByZoom } from '@pp-master-thesis/utils';
import { Tool } from '@pp-master-thesis/enums';

export const PathControls = ({
  element,
  zoomable,
  zoom,
  tool,
  setTool,
}: PropsActiveElement) => {
  const [pointIndex, setPointIndex] = React.useState<number>(-1);
  const [test, setTest] = React.useState<string>();
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
      setTest('yes');
      setPointIndex(index);
    },
    [pathPoints.length, setTool, zoomable]
  );

  const onMouseUp = React.useCallback(() => {
    setTest(undefined);
    setPointIndex(-1);
    setTool(Tool.NONE);
  }, [setTool]);

  React.useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!zoomable || pointIndex < 0 || tool !== Tool.PATH_MOVE_POINT) return;
      const { x, y } = zoomable.getMousePoint(event);
      setPathPoints((prevPoints) => {
        return prevPoints.map((prevPoint, i) =>
          i === pointIndex ? { command: prevPoint.command, x, y } : prevPoint
        );
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [pointIndex, tool, zoomable]);

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
