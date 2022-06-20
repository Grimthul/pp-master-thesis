import type { MouseEvent } from 'react';

export const isElementUnderEvent = (
  event: MouseEvent,
  element: HTMLElement | null | undefined
) => {
  const boundingRect = element?.getBoundingClientRect();
  return (
    boundingRect &&
    event.clientX > boundingRect.left &&
    event.clientX < boundingRect.right &&
    event.clientY > boundingRect.top &&
    event.clientY < boundingRect.bottom
  );
};
