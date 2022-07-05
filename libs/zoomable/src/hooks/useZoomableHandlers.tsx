import * as React from 'react';
import {
  invertMousePointInElement,
  mousePointInElement,
  mousePointInElementInverted,
} from '../utils/utils';
import { shouldZoom, zoomBy, zoomDirection, zoomStep } from '../utils/zoom';

import { Tool } from '@pp-master-thesis/enums';

import type { HandlersCommonProps } from '../lib/Zoomable';

interface ZoomableHandlers {
  handleTouchStart: () => void;
  handleTouchMove: () => void;
  handleTouchEnd: () => void;
  handleMouseDown: (event: React.MouseEvent) => void;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleWheel: (event: React.WheelEvent) => void;
}

interface Props {
  allowPan: boolean;
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
  others: HandlersCommonProps;
}

export const useZoomableHandlers = ({
  allowPan,
  setTool,
  others: {
    childRef,
    allowZoom,
    minZoom,
    maxZoom,
    step,
    matrix,
    setMatrix,
    wrapperRect,
  },
}: Props): ZoomableHandlers => {
  const [lastMouse, setLastMouse] = React.useState<DOMPointReadOnly>();
  const [panning, setPanning] = React.useState(false);

  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  const setToolWithDelay = (tool: Tool) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setTool(tool), 500);
  };

  const handleTouchStart = () => {
    console.log('handleTouchStart');
  };

  const handleTouchMove = () => {
    console.log('handleTouchMove');
  };

  const handleTouchEnd = () => {
    console.log('handleTouchEnd');
  };

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      if (timer.current) clearTimeout(timer.current);
      if (!allowPan || !wrapperRect || !event.ctrlKey) return;
      const position = mousePointInElement(event, wrapperRect);
      setLastMouse(position);
      setPanning(true);
    },
    [allowPan, wrapperRect]
  );

  const handleMouseMove = (event: React.MouseEvent) => {
    event.preventDefault(); // needed to disable text highlight on drag
    if (!allowPan || !wrapperRect || !lastMouse || !event.ctrlKey) return;
    if (panning) {
      setTool(Tool.PAN);
      const newLastMouse = mousePointInElement(event, wrapperRect);
      const start = invertMousePointInElement(lastMouse, matrix);
      const end = invertMousePointInElement(newLastMouse, matrix);
      const tx = end.x - start.x;
      const ty = end.y - start.y;
      setMatrix((matrix) => {
        return matrix.translate(tx, ty);
      });
      setLastMouse(newLastMouse);
    }
  };

  const handleMouseUp = React.useCallback(() => {
    if (!allowPan) return;
    setTool(Tool.NONE);
    setPanning(false);
  }, [allowPan, setTool]);

  const handleWheel = (event: React.WheelEvent) => {
    const direction = zoomDirection(event);
    const child = childRef.current;
    if (
      !allowZoom ||
      !shouldZoom(matrix, direction, minZoom, maxZoom) ||
      !wrapperRect ||
      !child
    )
      return;
    setTool(Tool.ZOOM);
    setMatrix((matrix) => {
      const { clientWidth: width, clientHeight: height } = child;
      const { x, y } = mousePointInElementInverted(
        event,
        wrapperRect,
        matrix,
        width / 2,
        height / 2
      );
      return zoomBy({
        matrix,
        minZoom,
        maxZoom,
        zoom: zoomStep(step, direction),
        x,
        y,
      });
    });
    if (!panning) setToolWithDelay(Tool.NONE);
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
  };
};
