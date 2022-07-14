import * as React from 'react';

import { isPanning, isResizing, isPathMoving } from '../../utils';
import type { PropsActiveElements } from '../../types/activeElements';

import { ElementType, Tool } from '@pp-master-thesis/enums';
import { isCircular, translateElementTo } from '../../utils';
import { PRIMARY_BUTTON } from '@pp-master-thesis/constants';
import { ActiveElementResize } from './ActiveElementResize';
import { PathControls } from './PathControls';

// TODO: setTool when updating anything to prevent events messing with other events, allowedTools for component and work only for them
// path element multi select not working

// const ActiveElementRotate = ({
//   element,
//   elementPosition,
//   zoom,
// }: PropsActiveElement) => {
//   const {
//     x: initX,
//     y: initY,
//     width,
//     height,
//   } = React.useMemo(() => element.getBBox(), [element]);
//   const [offsetX, offsetY] = isCircular(element)
//     ? [width / 2, height / 2]
//     : [0, 0];

//   const { x, y } = elementPosition || { x: initX, y: initY };
//   return (
//     <image
//       x={x + width - offsetX}
//       y={y - 10 - offsetY}
//       style={{
//         cursor: Tool.ROTATE,
//         transformOrigin: `${x + width - offsetX + 5}px ${
//           y - offsetY - 10 * strokeWidthByZoom(zoom)
//         }px`,
//       }}
//       transform={`scale(${Math.min(1, strokeWidthByZoom(zoom) * 2)})`}
//       href="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMTAiCiAgIGhlaWdodD0iMTAiCiAgIHZpZXdCb3g9IjAgMCAxMCAxMCIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0icm90YXRlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjAiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc4IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iNjcuNiIKICAgICBpbmtzY2FwZTpjeD0iMC43NTQ0Mzc4NyIKICAgICBpbmtzY2FwZTpjeT0iNC43NDg1MjA3IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTg1MiIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDExIgogICAgIGlua3NjYXBlOndpbmRvdy14PSI2OCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMzIiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmc1IiAvPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMyIiAvPgogIDxnCiAgICAgaWQ9ImcxODM5IgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0wLjM5OTkzOTgsMC40MDEzMjkzNikiPgogICAgPHBhdGgKICAgICAgIGlkPSJwYXRoOTk2IgogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I2QxNzEyNztzdHJva2Utd2lkdGg6MC43NTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheTpub25lIgogICAgICAgZD0iTSAxLjkzMjI0MTgsMi4yNjM4NDA4IEEgNC4wNzMxNDMsNC4xMTY2NTExIDAgMCAxIDUuMjg2ODkzLDAuNDgyMDE5NTkgNC4wNzMxNDMsNC4xMTY2NTExIDAgMCAxIDkuMzYwMDM2LDQuNTk4NjcwNiB2IDAgQSA0LjA3MzE0Myw0LjExNjY1MTEgMCAwIDEgNS4yODY4OTMsOC43MTUzMjE3IDQuMDczMTQzLDQuMTE2NjUxMSAwIDAgMSAxLjQzOTg0MzYsNS45NTExMzYxIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNkMTcxMjc7c3Ryb2tlLXdpZHRoOjAuNzU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAxLjU2NDI4MjQsMC44ODE0NjkxMyAwLjAwNjQ5LDEuNzUyMzY3MjcgMS43MzkxMDQ0LDAuMDEwNzMyIgogICAgICAgLz4KICA8L2c+Cjwvc3ZnPgo="
//     />
//   );
// };

export const ActiveElements = (props: PropsActiveElements) => {
  const { elements, disableDrag, setActiveElements, ...common } = props;
  const { setTool, zoomable, tool, setUpdated } = common;
  const [mouseOffsets, setMouseOffsets] = React.useState<DOMPointReadOnly[]>();
  const [dragged, setDragged] = React.useState(false);

  const updateElementsPosition = React.useCallback(
    (mouse?: DOMPointReadOnly, mouseOffsets?: DOMPointReadOnly[]) => {
      elements.forEach((element, i) => {
        const x = mouse && mouseOffsets && mouse.x - mouseOffsets[i].x;
        const y = mouse && mouseOffsets && mouse.y - mouseOffsets[i].y;
        if (x && y) translateElementTo(element, x, y);
      });
    },
    [elements]
  );

  React.useLayoutEffect(() => {
    updateElementsPosition();
  }, [updateElementsPosition]);

  React.useEffect(() => {
    const deleteElements = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        elements.forEach((element) =>
          element.parentElement?.removeChild(element)
        );
        setActiveElements([]);
      }
    };
    document.addEventListener('keypress', deleteElements);
    return () => document.removeEventListener('keypress', deleteElements);
  }, [elements, setActiveElements]);

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
            const newX = mouse.x - bBox.x;
            const newY = mouse.y - bBox.y;
            if (isCircular(element))
              return new DOMPointReadOnly(
                newX - bBox.width / 2,
                newY - bBox.height / 2
              );
            return new DOMPointReadOnly(newX, newY);
          })
        );
      }
      setTool(Tool.PAN);
    },
    [elements, setTool, zoomable]
  );

  React.useEffect(() => {
    const startDragging = (event: MouseEvent) => {
      startDrag(event);
    };

    const drag = (event: MouseEvent) => {
      if (disableDrag || event.ctrlKey) return;
      // handle drag right away after click
      if (
        !isPanning(tool) &&
        !isPathMoving(tool) &&
        !isResizing(tool) &&
        elements.includes(event.target as SVGGraphicsElement) &&
        event.buttons === PRIMARY_BUTTON
      ) {
        startDrag(event);
        setDragged(true);
      }
      if (isPanning(tool) && zoomable && mouseOffsets) {
        const mouse = zoomable.getMousePoint(event);
        updateElementsPosition(mouse, mouseOffsets);
        setDragged(true);
      }
    };

    const stopDragging = () => {
      if (dragged) setUpdated((prevValue) => prevValue + 1);
      setDragged(false);
      setMouseOffsets(undefined);
      setTool(Tool.NONE);
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
    dragged,
    elements,
    mouseOffsets,
    setTool,
    setUpdated,
    startDrag,
    tool,
    updateElementsPosition,
    zoomable,
  ]);

  return (
    <>
      {!isPanning(tool) &&
        elements.map((element, i) =>
          element.nodeName === ElementType.PATH ? (
            <PathControls key={i} element={element} {...common} />
          ) : (
            <ActiveElementResize key={i} element={element} {...common} />
          )
        )}
      {/* {!dragged && elements.length === 1 && (
        <ActiveElementRotate
          element={elements[0]}
          setResizing={setResizing}
          {...common}
        />
      )} */}
    </>
  );
};
