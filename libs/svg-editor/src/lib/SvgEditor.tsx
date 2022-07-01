import * as React from 'react';

import { onDragEnter, onDrop } from './handlers';
import { mergeWithDefaultOptions, dragImageTranslate } from './utils/';
import {
  useBackgroundImageGrid,
  useDragImageResetOnDragExit,
  useRefHandlers,
} from './hooks';

import { ID_DROPPABLE, ID_EDITOR } from '@pp-master-thesis/constants';
import { Droppable } from '@pp-master-thesis/droppable';
import { Zoomable } from '@pp-master-thesis/zoomable';
import { Tool } from '@pp-master-thesis/enums';

import type {
  SvgEditorOptions,
  SvgEditorRef,
  ZoomableRef,
  ZoomOptions,
} from '@pp-master-thesis/types';

import './SvgEditor.scss';

interface Props {
  options?: SvgEditorOptions;
  dragImageRef?: React.RefObject<HTMLDivElement>;
}

// TODO: Forward ref for zoom with buttons - zoomIn, zoomOut, zoomTo, resetZoom, resetView, newSVG

export const SvgEditor = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<SvgEditorRef>) => {
    const zoomableRef = React.useRef<ZoomableRef>(null);
    const droppableRef = React.useRef<HTMLDivElement>(null);
    const [backgroundImage, setBackgroundImage] = React.useState('');
    const [dragOffset, setDragOffset] = React.useState({
      tx: 0,
      ty: 0,
    });
    const [tool, setTool] = React.useState(Tool.NONE);
    const [zoom, setZoom] = React.useState(1);
    const svg = zoomableRef.current?.getChild() as unknown as SVGSVGElement;
    const options = React.useMemo(
      () => mergeWithDefaultOptions(props.options),
      [props.options]
    );
    const zoomOptions: ZoomOptions = {
      onZoomChange: React.useCallback(
        (zoom: number) => {
          setZoom(zoom);
          if (options.zoomOptions?.onZoomChange)
            options.zoomOptions.onZoomChange(zoom);
        },
        [options.zoomOptions]
      ),
      onToolChange: React.useCallback((tool: Tool) => setTool(tool), []),
      onPanChange: React.useCallback(
        (p: DOMPointReadOnly) => {
          if (options.zoomOptions?.onPanChange)
            options.zoomOptions.onPanChange(p);
        },
        [options.zoomOptions]
      ),
    };
    const [svgSize, setSvgSize] = React.useState<DOMRectReadOnly>();

    // update svg size when it's updated from outside
    React.useEffect(() => {
      setSvgSize(options.size);
    }, [options.size]);

    useBackgroundImageGrid(options, zoom, setBackgroundImage);
    useRefHandlers(ref, zoomableRef.current);
    useDragImageResetOnDragExit(props.dragImageRef, droppableRef);

    return (
      <Droppable
        id={ID_DROPPABLE}
        droppableRef={droppableRef}
        onDrop={(event) =>
          onDrop({
            event,
            zoomableRef,
            svg,
            zoom,
            dragOffset,
            setSvgSize,
          })
        }
        onDragEnter={() => {
          const dragImage = props.dragImageRef?.current;
          if (dragImage) onDragEnter(dragImage, zoom);
        }}
        onDragOver={(event: React.DragEvent) => {
          const dragImage = props.dragImageRef?.current;
          const zoomable = zoomableRef?.current;
          if (dragImage && zoomable) {
            const { tx, ty, guideLines } = dragImageTranslate(
              event,
              dragImage,
              options,
              zoomable
            );

            dragImage.style.left = `${event.clientX + tx * zoom}px`;
            dragImage.style.top = `${event.clientY + ty * zoom}px`;
            setDragOffset({ tx, ty });
          }
        }}
      >
        <Zoomable
          ref={zoomableRef}
          options={zoomOptions}
          style={{ cursor: tool }}
        >
          <svg
            id={ID_EDITOR}
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize?.width}
            height={svgSize?.height}
            style={{
              width: svgSize?.width,
              height: svgSize?.height,
              backgroundImage: backgroundImage,
              backgroundColor: options.backgroundColor,
            }}
          >
            {/* <rect
              width="100"
              height="100"
              fill="#EDE29F"
              // transform="matrix(0.5, 0, 0, 0.5, 0, 50)"
            /> */}
            {/* <rect
              width="600"
              height="300"
              fill="#EDE29F"
              // transform="matrix(0.5, 0, 0, 0.5, 0, 50)"
            />
            <circle
              cx="150"
              cy="100"
              r="90"
              fill="#48440E"
              // transform="matrix(0.5, 0, 0, 0.5, 50, 50)"
            />
            <circle cx="50" cy="50" r="1" fill="#ff0000" />
            <circle cx="400" cy="300" r="1" fill="#ff0000" />
            <text
              x="75"
              y="130"
              fontSize="77"
              fill="#ffffff"
              // transform="matrix(0.5, 0, 0, 0.5, 50, 50)"
            >
              SVG
            </text>
            <text x="150" y="500" fontSize="77" fill="#ff0000">
              Text
              <tspan fill="#000000" fontFamily="sans-serif">
                test
              </tspan>
            </text> */}
          </svg>
        </Zoomable>
      </Droppable>
    );
  }
);
