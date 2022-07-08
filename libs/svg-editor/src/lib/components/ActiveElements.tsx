import * as React from 'react';

import { Tool } from '@pp-master-thesis/enums';
import { isCircular, translateElementTo } from '../utils';
import { ZoomableRef } from '@pp-master-thesis/types';
import { strokeWidthByZoom } from '@pp-master-thesis/utils';

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
}

interface PropsActiveElements extends PropsCommon {
  elements: SVGGraphicsElement[];
}
interface CoordsModifier {
  modifierX: number;
  modifierY: number;
}

interface Control {
  coordsModifier: CoordsModifier;
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

const PRIMARY_BUTTON = 1;

const ActiveElement = ({
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
  const { x, y } = elementPosition || { x: initX, y: initY };
  const strokeWidth = strokeWidthByZoom(zoom);
  const circleStrokeWidth = 4 * strokeWidth;
  const fill = React.useMemo(() => '#d17127', []);
  const controls = React.useMemo<Controls>(
    () => ({
      NW: {
        coordsModifier: { modifierX: 0, modifierY: 0 },
      },
      N: {
        coordsModifier: { modifierX: 0.5, modifierY: 0 },
      },
      NE: {
        coordsModifier: { modifierX: 1, modifierY: 0 },
      },
      E: {
        coordsModifier: { modifierX: 1, modifierY: 0.5 },
      },
      SE: {
        coordsModifier: { modifierX: 1, modifierY: 1 },
      },
      S: {
        coordsModifier: { modifierX: 0.5, modifierY: 1 },
      },
      SW: {
        coordsModifier: { modifierX: 0, modifierY: 1 },
      },
      W: {
        coordsModifier: { modifierX: 0, modifierY: 0.5 },
      },
    }),
    []
  );
  const controlsKeys = Array.from(Object.keys(controls)) as Array<
    keyof Controls
  >;
  return (
    <>
      {controlsKeys.map((key) => {
        const { modifierX, modifierY } = controls[key].coordsModifier;
        return (
          <circle
            r={circleStrokeWidth}
            cx={x + width * modifierX}
            cy={y + height * modifierY}
            fill={fill}
            style={{ cursor: Tool[`${key}_RESIZE`] }}
          ></circle>
        );
      })}

      <image
        x={x + width}
        y={y - 10}
        style={{
          cursor: Tool.ROTATE,
          transformOrigin: `${x + width + 5}px ${
            y - 10 * strokeWidthByZoom(zoom)
          }px`,
        }}
        transform={`scale(${Math.min(1, strokeWidthByZoom(zoom) * 2)})`}
        href="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMTAiCiAgIGhlaWdodD0iMTAiCiAgIHZpZXdCb3g9IjAgMCAxMCAxMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0icm90YXRlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjAiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc4IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iNjcuNiIKICAgICBpbmtzY2FwZTpjeD0iMC43NTQ0Mzc4NyIKICAgICBpbmtzY2FwZTpjeT0iNC43NDg1MjA3IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTg1MiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDExIgogICAgIGlua3NjYXBlOndpbmRvdy14PSI2OCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMzIiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc1IiAvPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMyIiAvPgogIDxnCiAgICAgaWQ9ImcxODM5IgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjM5OTkzOTgsMC40MDEzMjkzNikiPgogICAgPHBhdGgKICAgICAgIGlkPSJwYXRoOTk2IgogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I2QxNzEyNztzdHJva2Utd2lkdGg6MC43NTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTpub25lIgogICAgICAgZD0iTSAxLjkzMjI0MTgsMi4yNjM4NDA4IEEgNC4wNzMxNDMsNC4xMTY2NTExIDAgMCAxIDUuMjg2ODkzLDAuNDgyMDE5NTkgNC4wNzMxNDMsNC4xMTY2NTExIDAgMCAxIDkuMzYwMDM2LDQuNTk4NjcwNiB2IDAgQSA0LjA3MzE0Myw0LjExNjY1MTEgMCAwIDEgNS4yODY4OTMsOC43MTUzMjE3IDQuMDczMTQzLDQuMTE2NjUxMSAwIDAgMSAxLjQzOTg0MzYsNS45NTExMzYxIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNkMTcxMjc7c3Ryb2tlLXdpZHRoOjAuNzU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAxLjU2NDI4MjQsMC44ODE0NjkxMyAwLjAwNjQ5LDEuNzUyMzY3MjcgMS43MzkxMDQ0LDAuMDEwNzMyIgogICAgICAgLz4KICA8L2c+Cjwvc3ZnPgo="
      />
    </>
  );
};

export const ActiveElements = (props: PropsActiveElements) => {
  const { elements, ...common } = props;
  const { setTool, setUpdating, zoomable } = common;
  const [dragging, setDragging] = React.useState(false);
  const [mouseOffsets, setMouseOffsets] = React.useState<DOMPointReadOnly[]>();
  const [elementPositions, setElementPositions] = React.useState<
    ElementPosition[]
  >([]);

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
      // handle drag right away after click
      if (
        !dragging &&
        elements.includes(event.target as SVGGraphicsElement) &&
        event.buttons === PRIMARY_BUTTON
      ) {
        startDrag(event);
      }
      if (dragging && zoomable && mouseOffsets) {
        setElementPositions([]);
        const mouse = zoomable.getMousePoint(event);
        elements.forEach((element, i) => {
          const x = mouse.x - mouseOffsets[i].x;
          const y = mouse.y - mouseOffsets[i].y;
          translateElementTo(element, x, y);
          setElementPositions((prevPositions) => [...prevPositions, { x, y }]);
        });
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
  }, [dragging, elements, mouseOffsets, setUpdating, startDrag, zoomable]);

  return (
    <>
      {elements.map((element, i) => (
        <ActiveElement
          element={element}
          elementPosition={elementPositions?.[i]}
          {...common}
        />
      ))}
    </>
  );
};
