import * as React from 'react';

import { Tool } from '@pp-master-thesis/enums';
import {
  isCircular,
  nodeCoordsInEditor,
  nodeSizeNames,
  translateElementTo,
} from '../utils';
import { ZoomableRef } from '@pp-master-thesis/types';
import { strokeWidthByZoom } from '@pp-master-thesis/utils';
import { PRIMARY_BUTTON } from '@pp-master-thesis/constants';

// TODO: setTool when updating anything to prevent events messing with other events, allowedTools for component and work only for them
// path element multi select not working

interface PropsCommon {
  zoomable: ZoomableRef | null;
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>;
  zoom: number;
}

interface ElementPosition {
  x: number;
  y: number;
}

interface PropsActiveElement extends PropsCommon {
  element: SVGGraphicsElement;
  elementPosition?: ElementPosition;
  setResizing: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PropsActiveElements extends PropsCommon {
  elements: SVGGraphicsElement[];
  disableDrag: boolean;
}
interface CoordsModifier {
  modifierX: number;
  modifierY: number;
}

interface Control {
  coordsModifier: CoordsModifier;
  direction: CoordsModifier;
}

interface Controls {
  NW: Control;
  N: Control;
  NE: Control;
  E: Control;
  SE: Control;
  S: Control;
  SW: Control;
  W: Control;
}

const ActiveElementRotate = ({
  element,
  elementPosition,
  zoom,
}: PropsActiveElement) => {
  const {
    x: initX,
    y: initY,
    width,
    height,
  } = React.useMemo(() => element.getBBox(), [element]);
  const [offsetX, offsetY] = isCircular(element)
    ? [width / 2, height / 2]
    : [0, 0];

  const { x, y } = elementPosition || { x: initX, y: initY };
  return (
    <image
      x={x + width - offsetX}
      y={y - 10 - offsetY}
      style={{
        cursor: Tool.ROTATE,
        transformOrigin: `${x + width - offsetX + 5}px ${
          y - offsetY - 10 * strokeWidthByZoom(zoom)
        }px`,
      }}
      transform={`scale(${Math.min(1, strokeWidthByZoom(zoom) * 2)})`}
      href="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMTAiCiAgIGhlaWdodD0iMTAiCiAgIHZpZXdCb3g9IjAgMCAxMCAxMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0icm90YXRlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjAiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc4IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iNjcuNiIKICAgICBpbmtzY2FwZTpjeD0iMC43NTQ0Mzc4NyIKICAgICBpbmtzY2FwZTpjeT0iNC43NDg1MjA3IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTg1MiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDExIgogICAgIGlua3NjYXBlOndpbmRvdy14PSI2OCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMzIiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc1IiAvPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMyIiAvPgogIDxnCiAgICAgaWQ9ImcxODM5IgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjM5OTkzOTgsMC40MDEzMjkzNikiPgogICAgPHBhdGgKICAgICAgIGlkPSJwYXRoOTk2IgogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I2QxNzEyNztzdHJva2Utd2lkdGg6MC43NTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTpub25lIgogICAgICAgZD0iTSAxLjkzMjI0MTgsMi4yNjM4NDA4IEEgNC4wNzMxNDMsNC4xMTY2NTExIDAgMCAxIDUuMjg2ODkzLDAuNDgyMDE5NTkgNC4wNzMxNDMsNC4xMTY2NTExIDAgMCAxIDkuMzYwMDM2LDQuNTk4NjcwNiB2IDAgQSA0LjA3MzE0Myw0LjExNjY1MTEgMCAwIDEgNS4yODY4OTMsOC43MTUzMjE3IDQuMDczMTQzLDQuMTE2NjUxMSAwIDAgMSAxLjQzOTg0MzYsNS45NTExMzYxIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNkMTcxMjc7c3Ryb2tlLXdpZHRoOjAuNzU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAxLjU2NDI4MjQsMC44ODE0NjkxMyAwLjAwNjQ5LDEuNzUyMzY3MjcgMS43MzkxMDQ0LDAuMDEwNzMyIgogICAgICAgLz4KICA8L2c+Cjwvc3ZnPgo="
    />
  );
};

const ActiveElementResize = ({
  element,
  zoomable,
  zoom,
  setResizing,
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
  const [dragging, setDragging] = React.useState(false);
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
  const controlsKeys = Array.from(Object.keys(controls)) as Array<
    keyof Controls
  >;
  const onMouseDown = (event: React.MouseEvent, key: string) => {
    if (!zoomable) return;
    setDragging(true);
    setDirection(key);
    setStartMouse(zoomable.getMousePoint(event));
    setStartBbox(element.getBBox());
    setResizing(true);
  };

  React.useEffect(() => {
    console.log(translate);
  }, [translate]);

  React.useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!zoomable || !startMouse || !dragging) return;
      const { modifierX, modifierY } =
        controls[direction as keyof Controls].direction;
      const { x, y, width, height } = startBbox;

      const end = zoomable.getMousePoint(event);
      const start = startMouse;
      const tx = modifierX < 0 ? -(end.x - start.x) : end.x - start.x;
      const ty = modifierY < 0 ? -(end.y - start.y) : end.y - start.y;

      const { widthName, heightName } = nodeSizeNames(element);
      const { xName, yName } = nodeCoordsInEditor(element);
      modifierX && element.setAttribute(widthName, (width + tx).toString());
      modifierY &&
        element.setAttribute(heightName || widthName, (height + ty).toString());
      modifierX < 0 && element.setAttribute(xName, (x - tx).toString());
      modifierY < 0 && element.setAttribute(yName, (y - ty).toString());
      setTranslate(new DOMPointReadOnly(tx, ty));
    };

    const onMouseUp = () => {
      setDragging(false);
      setStartMouse(undefined);
      setResizing(false);
      setDirection('');
      setTranslate(new DOMPointReadOnly(0, 0));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [
    controls,
    direction,
    dragging,
    element,
    height,
    setResizing,
    startBbox,
    startMouse,
    width,
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

export const ActiveElements = (props: PropsActiveElements) => {
  const { elements, disableDrag, ...common } = props;
  const { setTool, setUpdating, zoomable } = common;
  const [resizing, setResizing] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [mouseOffsets, setMouseOffsets] = React.useState<DOMPointReadOnly[]>();

  const updateElementsPosition = React.useCallback(
    (mouse?: DOMPointReadOnly, mouseOffsets?: DOMPointReadOnly[]) => {
      elements.forEach((element, i) => {
        const bBox = element.getBBox();
        const [offsetX, offsetY] = isCircular(element)
          ? [bBox.width / 2, bBox.height / 2]
          : [0, 0];
        const x =
          mouse && mouseOffsets
            ? mouse.x - mouseOffsets[i].x
            : bBox.x + offsetX;
        const y =
          mouse && mouseOffsets
            ? mouse.y - mouseOffsets[i].y
            : bBox.y + offsetY;
        translateElementTo(element, x, y);
      });
    },
    [elements]
  );

  React.useLayoutEffect(() => {
    updateElementsPosition();
  }, [updateElementsPosition]);

  React.useEffect(
    () => (dragging ? setTool(Tool.PAN) : setTool(Tool.NONE)),
    [dragging, setTool]
  );

  /**
   * Can't use just difference between last mouse and current mouse position,
   * browser sometimes throws away events and then the translation would be
   * incorrect.
   * Difference between starting positions and current mouse position must be used instead.
   */
  const startDrag = React.useCallback(
    (event: MouseEvent) => {
      const mouse = zoomable?.getMousePoint(event);
      if (mouse && event.target !== zoomable?.getChild()) {
        setMouseOffsets(
          elements.map((element) => {
            const bBox = element.getBBox();
            if (isCircular(element))
              return new DOMPointReadOnly(
                mouse.x - bBox.x - bBox.width / 2,
                mouse.y - bBox.y - bBox.height / 2
              );
            return new DOMPointReadOnly(mouse.x - bBox.x, mouse.y - bBox.y);
          })
        );
      }
      setDragging(true);
      setUpdating(true);
    },
    [elements, setUpdating, zoomable]
  );

  React.useEffect(() => {
    const startDragging = (event: MouseEvent) => {
      startDrag(event);
    };

    const drag = (event: MouseEvent) => {
      if (disableDrag) return;
      // handle drag right away after click
      if (
        !dragging &&
        !resizing &&
        elements.includes(event.target as SVGGraphicsElement) &&
        event.buttons === PRIMARY_BUTTON
      ) {
        startDrag(event);
      }
      if (dragging && zoomable && mouseOffsets) {
        const mouse = zoomable.getMousePoint(event);
        updateElementsPosition(mouse, mouseOffsets);
      }
    };

    const stopDragging = () => {
      setMouseOffsets(undefined);
      setDragging(false);
      setUpdating(false);
    };

    elements.forEach((element) =>
      element.addEventListener('mousedown', startDragging)
    );
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    return () => {
      elements.forEach((element) =>
        element.removeEventListener('mousedown', startDragging)
      );
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDragging);
    };
  }, [
    disableDrag,
    dragging,
    elements,
    mouseOffsets,
    resizing,
    setUpdating,
    startDrag,
    updateElementsPosition,
    zoomable,
  ]);

  return (
    <>
      {!dragging &&
        elements.map((element, i) => (
          <ActiveElementResize
            key={i}
            element={element}
            setResizing={setResizing}
            {...common}
          />
        ))}
      {!dragging && elements.length === 1 && (
        <ActiveElementRotate
          element={elements[0]}
          setResizing={setResizing}
          {...common}
        />
      )}
    </>
  );
};
