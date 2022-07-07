import * as React from 'react';

import { onDragEnter, onDrop } from './handlers';
import { mergeWithDefaultOptions, dragImageTranslate } from './utils/';
import {
  useBackgroundImageGrid,
  useDragImageResetOnDragExit,
  useRefHandlers,
} from './hooks';
import { ActiveElements, GuideLines } from './components/';

import type { ElementGuideLines } from './types/dragImage';

import { ActivableSvg } from '@pp-master-thesis/activable-svg';
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

const defaultGuideLines = () => ({
  mouse: new DOMPointReadOnly(),
  guideLines: {},
});

// TODO: Forward ref for zoom with buttons - zoomIn, zoomOut, zoomTo, resetZoom, resetView, newSVG

export const SvgEditor = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<SvgEditorRef>) => {
    const zoomableRef = React.useRef<ZoomableRef>(null);
    const droppableRef = React.useRef<HTMLDivElement>(null);
    const elementsWrapperRef = React.useRef<SVGGraphicsElement>(null);
    const [backgroundImage, setBackgroundImage] = React.useState('');
    const [dragOffset, setDragOffset] = React.useState({
      tx: 0,
      ty: 0,
    });
    const [tool, setTool] = React.useState(Tool.NONE);
    const [zoom, setZoom] = React.useState(1);
    const [activeElements, setActiveElements] = React.useState<
      SVGGraphicsElement[]
    >([]);
    const svg = zoomableRef.current?.getChild() as unknown as SVGSVGElement;
    const [guideLines, setGuideLines] = React.useState<{
      mouse: DOMPointReadOnly;
      guideLines: ElementGuideLines;
    }>(defaultGuideLines());
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

    React.useEffect(() => {
      console.log(activeElements);
      // handle active element - e.g. show active element menu
    }, [activeElements]);

    useBackgroundImageGrid(options, zoom, setBackgroundImage);
    useRefHandlers(ref, zoomableRef.current);
    useDragImageResetOnDragExit(props.dragImageRef, droppableRef);

    return (
      <Droppable
        id={ID_DROPPABLE}
        droppableRef={droppableRef}
        onDrop={(event) => {
          onDrop({
            event,
            zoomableRef,
            svg,
            elementsWrapper: elementsWrapperRef?.current,
            zoom,
            dragOffset,
            setSvgSize,
          });
          setGuideLines(defaultGuideLines());
        }}
        onDragEnter={() => {
          const dragImage = props.dragImageRef?.current;
          if (dragImage) onDragEnter(dragImage, zoom);
        }}
        onDragOver={(event: React.DragEvent) => {
          const dragImage = props.dragImageRef?.current;
          const zoomable = zoomableRef.current;
          const elementsWrapper = elementsWrapperRef?.current;
          if (dragImage && zoomable && elementsWrapper) {
            const mouse = zoomable.getMousePoint(event);
            const { tx, ty, guideLines } = dragImageTranslate(
              mouse,
              dragImage,
              options,
              elementsWrapper
            );

            dragImage.style.left = `${event.clientX + tx * zoom}px`;
            dragImage.style.top = `${event.clientY + ty * zoom}px`;
            if (guideLines) {
              setGuideLines({ mouse, guideLines });
            }
            setDragOffset({ tx, ty });
          }
        }}
      >
        <Zoomable
          ref={zoomableRef}
          options={zoomOptions}
          style={{ cursor: tool }}
        >
          <ActivableSvg
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
            setActiveElements={setActiveElements}
            getMousePoint={zoomableRef.current?.getMousePoint}
            zoom={zoom}
          >
            <g ref={elementsWrapperRef} />
            {props.dragImageRef?.current && (
              <GuideLines
                mouse={guideLines.mouse}
                guideLines={guideLines.guideLines}
                dragImage={props.dragImageRef?.current}
                zoom={zoom}
                gridGap={Boolean(options.grid?.gap)}
                snapRadius={options.elements?.snapRadius}
              />
            )}
            {activeElements.length > 0 && (
              <ActiveElements
                elements={activeElements}
                zoomable={zoomableRef.current}
                zoom={zoom}
                setTool={setTool}
              />
            )}
          </ActivableSvg>
        </Zoomable>
      </Droppable>
    );
  }
);
