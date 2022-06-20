import React from 'react';

// disabling page zoom on wheel
export const usePageZoomDisable = (
  ref: React.RefObject<HTMLDivElement>
): void => {
  React.useEffect(() => {
    const element = ref.current;
    const disableWheel = (event: WheelEvent): void => {
      event.preventDefault();
    };
    element?.addEventListener('wheel', disableWheel, true);
    return element?.removeEventListener('wheel', disableWheel);
  }, [ref]);
};
