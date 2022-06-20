import * as React from 'react';
import { Matrix } from '@pp-master-thesis/matrix';
import {
  usePageZoomDisable,
  useOnActionHandlers,
  useRefHandlers,
  useZoomableHandlers,
} from '../hooks';
import { mergeWithDefaultOptions } from '../utils/utils';

import { Tool } from '@pp-master-thesis/enums';
import type { ZoomableRef, ZoomOptions } from '@pp-master-thesis/types';

import './Zoomable.scss';

interface Props {
  children: React.ReactElement;
  options?: ZoomOptions;
  style?: React.CSSProperties;
}

export interface HandlersCommonProps {
  childRef: React.MutableRefObject<HTMLElement | undefined>;
  allowZoom: boolean;
  minZoom: number;
  maxZoom: number;
  step: number;
  matrix: DOMMatrixReadOnly;
  setMatrix: React.Dispatch<React.SetStateAction<DOMMatrixReadOnly>>;
  wrapperRect: DOMRect | undefined;
}

export const Zoomable = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<ZoomableRef>) => {
    const { children } = props;
    const [tool, setTool] = React.useState(Tool.NONE);
    const [matrix, setMatrix] = React.useState<DOMMatrixReadOnly>(
      Matrix.identity()
    );
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const wrapperRect = wrapperRef?.current?.getBoundingClientRect();
    const childRef = React.useRef<HTMLElement>();
    const options = mergeWithDefaultOptions(props.options || {});
    const { allowZoom, allowPan, step, minZoom, maxZoom } = options;
    const handlersCommonProps: HandlersCommonProps = {
      childRef,
      allowZoom,
      minZoom,
      maxZoom,
      step,
      matrix,
      setMatrix,
      wrapperRect,
    };
    const handlers = useZoomableHandlers({
      allowPan,
      setTool,
      others: handlersCommonProps,
    });
    useRefHandlers({ ref, others: handlersCommonProps });
    usePageZoomDisable(wrapperRef);
    useOnActionHandlers(options, matrix, tool);

    return (
      <div
        ref={wrapperRef}
        className="zoomable"
        onTouchStart={handlers.handleTouchStart}
        onTouchMove={handlers.handleTouchMove}
        onTouchEnd={handlers.handleTouchEnd}
        onMouseDown={handlers.handleMouseDown}
        onMouseMove={handlers.handleMouseMove}
        onMouseUp={handlers.handleMouseUp}
        onMouseLeave={handlers.handleMouseUp}
        onWheel={handlers.handleWheel}
        style={props.style}
      >
        {React.cloneElement(children, {
          ...children.props,
          style: {
            ...children.props.style,
            transform: matrix.toString(),
            display: 'block',
          },
          ref: (ref: HTMLElement | undefined) => (childRef.current = ref),
        })}
      </div>
    );
  }
);
