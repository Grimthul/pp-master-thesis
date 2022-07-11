import * as React from 'react';

import type { PropsActiveElement } from './types';

import { strokeWidthByZoom } from '@pp-master-thesis/utils';
import { Tool } from '@pp-master-thesis/enums';

export const PathControls = ({
  element,
  zoomable,
  zoom,
  tool,
  setTool,
}: PropsActiveElement) => {
  const [startMouse, setStartMouse] = React.useState<DOMPointReadOnly>();
  const [startBbox, setStartBbox] = React.useState<DOMRectReadOnly>(() =>
    element.getBBox()
  );
  const [translate, setTranslate] = React.useState<DOMPointReadOnly>(
    new DOMPointReadOnly(0, 0)
  );
  const { x, y, width, height } = element.getBBox();
  const strokeWidth = strokeWidthByZoom(zoom);
  const circleStrokeWidth = 4 * strokeWidth;
  const fill = React.useMemo(() => '#d17127', []);

  const pathPoints: DOMPointReadOnly[] = []; // get points with regex simmilar to Path.moveBy

  const onMouseDown = (event: React.MouseEvent) => {
    if (!zoomable) return;
    setStartMouse(zoomable.getMousePoint(event));
  };

  React.useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {};

    const onMouseUp = () => {};

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      {pathPoints.map((point, i) => {
        return (
          <circle
            key={i}
            onMouseDown={onMouseDown}
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
