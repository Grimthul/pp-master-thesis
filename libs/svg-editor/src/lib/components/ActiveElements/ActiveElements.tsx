import * as React from 'react';

import {
  dragElementTranslate,
  isCircular,
  isPanning,
  isPath,
  isPathMoving,
  isResizing,
  isSelectingElements,
  translateElementTo,
} from '../../utils';
import type { PropsActiveElements } from '../../types/activeElements';

import { ElementType, Tool } from '@pp-master-thesis/enums';
import { isPrimaryButton } from '@pp-master-thesis/utils';

import { ActiveElementResize } from './ActiveElementResize';
import { PathControls } from './PathControls';

export const ActiveElements = (props: PropsActiveElements) => {
  const {
    activeElements,
    elements,
    draggedElement,
    setActiveElements,
    setGuideLines,
    setDraggedElement,
    ...common
  } = props;
  const { setTool, zoomable, tool, options, setUpdated } = common;
  const [mouseOffsets, setMouseOffsets] = React.useState<DOMPointReadOnly[]>();
  const [dragged, setDragged] = React.useState(false);

  const updateElementsPosition = React.useCallback(
    (mouse?: DOMPointReadOnly, mouseOffsets?: DOMPointReadOnly[]) => {
      if (!mouse || !mouseOffsets || !draggedElement) return;
      const bBox = draggedElement.getBBox();
      const offsetX = isCircular(draggedElement) ? bBox.width / 2 : 0;
      const offsetY = isCircular(draggedElement) ? bBox.height / 2 : 0;
      const { tx, ty, guideLines } = dragElementTranslate(
        new DOMPointReadOnly(
          mouse.x - mouseOffsets[0].x - offsetX,
          mouse.y - mouseOffsets[0].y - offsetY
        ),
        draggedElement,
        options,
        isPath(draggedElement)
          ? undefined
          : elements.filter((element) => !activeElements.includes(element))
      );

      activeElements.forEach((element, i) => {
        const x = mouse.x - mouseOffsets[i].x + tx;
        const y = mouse.y - mouseOffsets[i].y + ty;
        translateElementTo(element, x, y);
        if (guideLines) setGuideLines({ mouse, guideLines });
      });
    },
    [activeElements, draggedElement, elements, options, setGuideLines]
  );

  React.useLayoutEffect(() => {
    updateElementsPosition();
  }, [updateElementsPosition]);

  React.useEffect(() => {
    const deleteElements = (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        activeElements.forEach((element) =>
          element.parentElement?.removeChild(element)
        );
        setActiveElements([]);
      }
    };
    document.addEventListener('keypress', deleteElements);
    return () => document.removeEventListener('keypress', deleteElements);
  }, [activeElements, setActiveElements]);

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
          activeElements.map((element) => {
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
      setDraggedElement(event.target as SVGGraphicsElement);
    },
    [activeElements, setDraggedElement, setTool, zoomable]
  );

  React.useEffect(() => {
    const startDragging = (event: MouseEvent) => {
      startDrag(event);
    };

    const drag = (event: MouseEvent) => {
      if (isSelectingElements(tool) || event.ctrlKey) return;
      // handle drag right away after click
      if (
        !isPanning(tool) &&
        !isPathMoving(tool) &&
        !isResizing(tool) &&
        activeElements.includes(event.target as SVGGraphicsElement) &&
        isPrimaryButton(event.button)
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
      setDraggedElement(undefined);
      setGuideLines(undefined);
    };

    activeElements.forEach((element) =>
      element.addEventListener('mousedown', startDragging)
    );
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    return () => {
      activeElements.forEach((element) =>
        element.removeEventListener('mousedown', startDragging)
      );
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDragging);
    };
  }, [
    activeElements,
    dragged,
    mouseOffsets,
    setDraggedElement,
    setGuideLines,
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
        activeElements.map((element, i) =>
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
