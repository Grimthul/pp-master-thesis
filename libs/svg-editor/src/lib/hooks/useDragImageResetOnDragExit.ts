import * as React from 'react';
import { isElementUnderEvent } from '@pp-master-thesis/utils';

export const useDragImageResetOnDragExit = (
  dragImageRef?: React.RefObject<HTMLDivElement>,
  droppableRef?: React.RefObject<HTMLDivElement>
) => {
  React.useEffect(() => {
    const resetDragImageTransform = (event: DragEvent) => {
      const dragImage = dragImageRef?.current;
      const dragImageTransform = dragImage?.style.transform;
      if (!dragImageTransform) return;
      const droppable = droppableRef?.current;
      if (
        !isElementUnderEvent(event as unknown as React.DragEvent, droppable)
      ) {
        dragImage.style.transform = '';
      }
    };

    document.addEventListener('drag', resetDragImageTransform);
    return () => document.removeEventListener('drag', resetDragImageTransform);
  });
};
