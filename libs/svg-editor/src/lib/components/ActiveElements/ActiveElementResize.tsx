import * as React from 'react';

import {
  isCircular,
  isResizing,
  nodeCoordsInEditor,
  nodeSizeNames,
} from '../../utils';
import type { Controls, PropsActiveElement } from './types';

import { strokeWidthByZoom } from '@pp-master-thesis/utils';
import { Tool } from '@pp-master-thesis/enums';

export const ActiveElementResize = ({
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
  const [direction, setDirection] = React.useState('');
  const { x, y, width, height } = element.getBBox();
  const strokeWidth = strokeWidthByZoom(zoom);
  const circleStrokeWidth = 4 * strokeWidth;
  const fill = React.useMemo(() => '#d17127', []);

  const controls = React.useMemo<Controls>(
    () => ({
      NW: {
        coordsModifier: { modifierX: 0, modifierY: 0 },
        direction: { modifierX: -1, modifierY: -1 },
      },
      N: {
        coordsModifier: { modifierX: 0.5, modifierY: 0 },
        direction: { modifierX: 0, modifierY: -1 },
      },
      NE: {
        coordsModifier: { modifierX: 1, modifierY: 0 },
        direction: { modifierX: 1, modifierY: -1 },
      },
      E: {
        coordsModifier: { modifierX: 1, modifierY: 0.5 },
        direction: { modifierX: 1, modifierY: 0 },
      },
      SE: {
        coordsModifier: { modifierX: 1, modifierY: 1 },
        direction: { modifierX: 1, modifierY: 1 },
      },
      S: {
        coordsModifier: { modifierX: 0.5, modifierY: 1 },
        direction: { modifierX: 0, modifierY: 1 },
      },
      SW: {
        coordsModifier: { modifierX: 0, modifierY: 1 },
        direction: { modifierX: -1, modifierY: 1 },
      },
      W: {
        coordsModifier: { modifierX: 0, modifierY: 0.5 },
        direction: { modifierX: -1, modifierY: 0 },
      },
    }),
    []
  );
  const controlsKeys = React.useMemo(
    () => Array.from(Object.keys(controls)) as Array<keyof Controls>,
    [controls]
  );

  const onMouseDown = (event: React.MouseEvent, key: string) => {
    if (!zoomable) return;
    setDirection(key);
    setStartMouse(zoomable.getMousePoint(event));
    setStartBbox(element.getBBox());
    setTool(Tool[`${key}_RESIZE` as keyof typeof Tool]);
  };

  React.useEffect(() => {
    // const oppositeDirection = (direction: keyof Controls) =>
    //   controlsKeys[(controlsKeys.indexOf(direction) + 4) % controlsKeys.length];

    const onMouseMove = (event: MouseEvent) => {
      if (!zoomable || !startMouse || !isResizing(tool)) return;
      const { modifierX, modifierY } =
        controls[direction as keyof Controls].direction;
      const { x, y, width, height } = startBbox;

      const end = zoomable.getMousePoint(event);
      const start = startMouse;
      const circular = isCircular(element);
      const txOffset = circular ? width / 2 : 0;
      const tyOffset = circular ? height / 2 : 0;
      const tx =
        (modifierX < 0 ? -(end.x - start.x) : end.x - start.x) - txOffset;
      const ty =
        (modifierY < 0 ? -(end.y - start.y) : end.y - start.y) - tyOffset;

      const { widthName, heightName } = nodeSizeNames(element);
      const { xName, yName } = nodeCoordsInEditor(element);
      const newWidth = Math.max(1, width + tx);
      const newHeight = Math.max(1, height + ty);
      if (newWidth === 1 || newHeight === 1) {
        // setDirection(oppositeDirection(direction as keyof Controls));
        return;
      }

      modifierX && element.setAttribute(widthName, newWidth.toString());
      modifierY &&
        element.setAttribute(heightName || widthName, newHeight.toString());
      modifierX < 0 &&
        !circular &&
        element.setAttribute(xName, (x - tx).toString());
      modifierY < 0 &&
        !circular &&
        element.setAttribute(yName, (y - ty).toString());
      setTranslate(new DOMPointReadOnly(tx, ty));
    };

    const onMouseUp = () => {
      setStartMouse(undefined);
      setDirection('');
      setTranslate(new DOMPointReadOnly(0, 0));
      setTool(Tool.NONE);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [
    controls,
    // controlsKeys,
    direction,
    element,
    setTool,
    startBbox,
    startMouse,
    tool,
    zoomable,
  ]);

  return (
    <>
      {controlsKeys.map((key) => {
        const { modifierX, modifierY } = controls[key].coordsModifier;
        return (
          (direction === '' || direction === key) && (
            <circle
              key={key}
              onMouseDown={(event) => onMouseDown(event, key)}
              r={circleStrokeWidth}
              cx={x + width * modifierX}
              cy={y + height * modifierY}
              fill={fill}
              style={{ cursor: Tool[`${key}_RESIZE`] }}
            ></circle>
          )
        );
      })}
    </>
  );
};
