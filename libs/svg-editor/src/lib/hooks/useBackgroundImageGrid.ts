import * as React from 'react';

import { strokeWidthByZoom } from '../utils';
import type { SvgEditorOptions } from '@pp-master-thesis/types';

/**
 * Updated background grid according to options
 */
export const useBackgroundImageGrid = (
  options: SvgEditorOptions,
  zoom: number,
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>
) => {
  const { gap, style, color, hide } = options.guideLines || {};
  const [strokeWidth, setStrokeWidth] = React.useState(1);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    const updateStrokeWidthWithDelay = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(
        () => setStrokeWidth(strokeWidthByZoom(zoom)),
        100
      );
    };
    updateStrokeWidthWithDelay();
  }, [zoom]);

  React.useEffect(() => {
    if (hide) return;
    const svgGrid = `<svg xmlns='http://www.w3.org/2000/svg' width='${gap}' height='${gap}'>
          <rect width='${gap}' height='${gap}' fill='transparent' stroke='${color}' stroke-width='${strokeWidth}'/>
          </svg>`;

    setBackgroundImage(
      `url('data:image/svg+xml;base64,${window.btoa(svgGrid)}')`
    );
  }, [gap, style, color, strokeWidth, hide, setBackgroundImage]);
};
