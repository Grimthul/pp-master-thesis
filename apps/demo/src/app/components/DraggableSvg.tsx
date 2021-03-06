import * as React from 'react';

import { Draggable } from '@pp-master-thesis/draggable';
import { isElementUnderEvent } from '@pp-master-thesis/utils';

export const DraggableSvg = ({
  children,
  dragImageRef,
}: {
  children: React.ReactElement;
  dragImageRef?: React.RefObject<HTMLDivElement>;
}) => {
  const dragImageDefaultStyle = React.useMemo<React.CSSProperties>(
    () => ({
      position: 'fixed',
      outline: '1px dashed #000',
      outlineOffset: '-1px',
      pointerEvents: 'none',
      zIndex: 999,
      transition: 'transform 500ms',
    }),
    []
  );
  const onDragOffTarget = document.getElementById('droppable');
  const emptyBase64Png = React.useMemo(
    () =>
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
    []
  );
  const [dragImageStyle, setDragImageStyle] =
    React.useState<React.CSSProperties>({});

  const onDragStart = (event: React.DragEvent) => {
    const element = event.currentTarget.firstElementChild;
    const svgElement = element?.firstElementChild;
    const id = element?.id;
    if (!element || !svgElement || !id) return;
    const img = document.createElement('img');
    img.src = emptyBase64Png;

    event.dataTransfer.setDragImage(img, 0, 0);
    event.dataTransfer.setData('elementId', id);
    const svgElementRect = svgElement.getBoundingClientRect();
    setDragImageStyle({
      left: event.clientX,
      top: event.clientY,
      width: svgElementRect.width,
      height: svgElementRect.height,
      ...dragImageDefaultStyle,
    });
  };

  const onDrag = (event: React.DragEvent) => {
    const shouldDrag = !isElementUnderEvent(event, onDragOffTarget);
    if (shouldDrag)
      setDragImageStyle((prevStyle) => ({
        ...prevStyle,
        left: event.clientX,
        top: event.clientY,
      }));
  };

  return (
    <Draggable
      dragImageStyle={dragImageStyle}
      dragImageRef={dragImageRef}
      onDragStart={onDragStart}
      onDrag={onDrag}
    >
      {children}
    </Draggable>
  );
};
