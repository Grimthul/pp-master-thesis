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

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const strokeWidthByZoom = (zoom: number) => 1;

export const isPrimaryButton = (button: number) => button === 1;
