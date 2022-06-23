import * as React from 'react';

import type { SvgEditorRef, ZoomableRef } from '@pp-master-thesis/types';

export const useRefHandlers = (
  ref: React.ForwardedRef<SvgEditorRef>,
  zoomableRef: ZoomableRef | null
) => {
  React.useImperativeHandle(ref, () => ({ zoomableRef }));
};
