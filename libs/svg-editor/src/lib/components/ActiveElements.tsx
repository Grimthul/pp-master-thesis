import * as React from 'react';

import { Tool } from '@pp-master-thesis/enums';
import { isCircular, translateElementTo } from '../utils';
import { ZoomableRef } from '@pp-master-thesis/types';

const PRIMARY_BUTTON = 1;

interface PropsCommon {
  zoomable: ZoomableRef | null;
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
  zoom: number;
}

interface PropsActiveElement extends PropsCommon {
  element: SVGGraphicsElement;
}

interface PropsActiveElements extends PropsCommon {
  elements: SVGGraphicsElement[];
}

interface Control {
  tool: Tool;
  coordsModifier: { x: number; y: number };
  action: (event: React.MouseEvent) => void;
}

interface Controls {
  nw: Control;
  n: Control;
  ne: Control;
  e: Control;
  se: Control;
  s: Control;
  sw: Control;
  w: Control;
}

const ActiveElement = ({
  element,
  zoom,
  zoomable,
  setTool,
}: PropsActiveElement) => {
  const countCoords =
    (x: number, y: number, width: number, height: number) =>
    (modifierX: number, modifierY: number) =>
      new DOMPointReadOnly(x + width * modifierX, y + height * modifierY);

  // const controls = React.useMemo<Controls>(
  //   () => ({
  //     nw: { tool: Tool.NW_RESIZE, coordsModifier: { x: 0, y: 0 } },
  //   }),
  //   []
  // );
  return <circle></circle>;
};

export const ActiveElements = (props: PropsActiveElements) => {
  const { elements, ...common } = props;
  const { setTool, zoomable } = common;
  const [dragging, setDragging] = React.useState(false);
  const [mouseOffsets, setMouseOffsets] = React.useState<DOMPointReadOnly[]>();

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
  React.useEffect(() => {
    const startDragging = (event: MouseEvent) => {
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
    };

    const drag = (event: MouseEvent) => {
      if (dragging && zoomable && mouseOffsets) {
        const mouse = zoomable.getMousePoint(event);
        elements.forEach((element, i) => {
          const x = mouse.x - mouseOffsets[i].x;
          const y = mouse.y - mouseOffsets[i].y;
          translateElementTo(element, x, y);
        });
      }
    };

    const stopDragging = () => {
      setMouseOffsets(undefined);
      setDragging(false);
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
  }, [dragging, elements, mouseOffsets, zoomable]);

  return (
    <>
      {elements.map((element) => (
        <ActiveElement element={element} {...common} />
      ))}
    </>
  );
};
