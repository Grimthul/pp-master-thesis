import * as React from 'react';

import type { SvgEditorRef, ZoomableRef } from '@pp-master-thesis/types';

export const useRefHandlers = (
  ref: React.ForwardedRef<SvgEditorRef>,
  zoomableRef: ZoomableRef | null,
  elementsWrapperRef: React.RefObject<SVGGraphicsElement>,
  setSvgSize: React.Dispatch<React.SetStateAction<DOMRectReadOnly | undefined>>,
  setActiveElements: React.Dispatch<React.SetStateAction<SVGGraphicsElement[]>>
) => {
  React.useImperativeHandle(ref, () => ({
    zoomableRef,
    createNewEditor(width, height) {
      if (!elementsWrapperRef.current) return;
      setSvgSize(new DOMRectReadOnly(0, 0, width, height));
      elementsWrapperRef.current.innerHTML = '';
      setActiveElements([]);
    },
    changeEditorSize(width, height) {
      setSvgSize(new DOMRectReadOnly(0, 0, width, height));
    },
  }));
};
