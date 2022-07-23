import * as React from 'react';

import { onDragEnter, onDrop } from './handlers';
import {
  mergeWithDefaultOptions,
  dragElementTranslate,
  isPath,
  translateElement,
} from './utils/';
import {
  useBackgroundImageGrid,
  useDragImageResetOnDragExit,
  useRefHandlers,
} from './hooks';
import { ActiveElements, GuideLines } from './components/';

import { ElementGuideLines } from './types/dragElement';
import { ActivableSvg } from '@pp-master-thesis/activable-svg';
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
import { ID_DROPPABLE } from '@pp-master-thesis/constants';
import { TOOL_CURSORS } from './constants';

interface Props {
  options?: SvgEditorOptions;
  dragImageRef?: React.RefObject<HTMLDivElement>;
  updatedFromOutside: number;
  setUpdated: React.Dispatch<React.SetStateAction<number>>;
  setActiveElements: React.Dispatch<React.SetStateAction<SVGGraphicsElement[]>>;
}

const defaultGuideLines = () => ({
  mouse: new DOMPointReadOnly(),
  guideLines: {},
});

export const SvgEditor = React.forwardRef(
  (props: Props, ref: React.ForwardedRef<SvgEditorRef>) => {
    const zoomableRef = React.useRef<ZoomableRef>(null);
    const droppableRef = React.useRef<HTMLDivElement>(null);
    const elementsWrapperRef = React.useRef<SVGGraphicsElement>(null);
    const elements = Array.from(
      elementsWrapperRef.current?.children || []
    ) as SVGGraphicsElement[];
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
    const [elementsToCopy, setElementsToCopy] = React.useState<
      SVGGraphicsElement[]
    >([]);
    const svg = zoomableRef.current?.getChild() as unknown as SVGSVGElement;
    const [guideLines, setGuideLines] = React.useState<
      | {
          mouse: DOMPointReadOnly;
          guideLines: ElementGuideLines;
        }
      | undefined
    >(defaultGuideLines());
    const propsSetActiveElements = props.setActiveElements;
    const [options, setOptions] = React.useState(() =>
      mergeWithDefaultOptions(props.options)
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
    const [draggedElement, setDraggedElement] =
      React.useState<SVGGraphicsElement>();
    const dragElement =
      props.dragImageRef?.current ||
      (!isPath(draggedElement) && draggedElement);

    // update svg size when it's updated from outside
    React.useEffect(() => {
      if (props.options)
        setOptions({
          ...mergeWithDefaultOptions(props.options),
        });
    }, [props.options, svgSize]);

    React.useEffect(() => {
      propsSetActiveElements(activeElements);
    }, [activeElements, propsSetActiveElements]);

    useBackgroundImageGrid(options, zoom, setBackgroundImage);
    useRefHandlers(
      ref,
      svg,
      zoomableRef.current,
      elementsWrapperRef,
      setSvgSize,
      setActiveElements
    );
    useDragImageResetOnDragExit(props.dragImageRef, droppableRef);

    React.useEffect(() => {
      const handleKeyboard = (event: KeyboardEvent) => {
        if (event.key === 'Delete') {
          activeElements.forEach((element) =>
            element.parentElement?.removeChild(element)
          );
          setActiveElements([]);
        } else if (event.ctrlKey) {
          if (event.key === 'c') {
            setElementsToCopy(activeElements);
          } else if (event.key === 'x') {
            setElementsToCopy(activeElements);
            activeElements.forEach((element) =>
              elementsWrapperRef.current?.removeChild(element)
            );
            setActiveElements([]);
          } else if (event.key === 'v') {
            setActiveElements([]);
            const copiedElements = elementsToCopy.map((element) => {
              const elementCopy = element.cloneNode(true) as SVGGraphicsElement;
              translateElement(elementCopy, 10, 10);
              elementsWrapperRef.current?.appendChild(elementCopy);
              return elementCopy;
            });
            setActiveElements(copiedElements);
            setElementsToCopy(copiedElements);
          }
        }
      };
      document.addEventListener('keyup', handleKeyboard);
      return () => document.removeEventListener('keyup', handleKeyboard);
    }, [activeElements, elementsToCopy]);

    return (
      <Droppable
        id={ID_DROPPABLE}
        style={{ visibility: `${options.visible ? 'visible' : 'hidden'}` }}
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
          if (dragImage && zoomable && elements) {
            const mouse = zoomable.getMousePoint(event);
            const { tx, ty, guideLines } = dragElementTranslate(
              mouse,
              dragImage,
              options,
              elements
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
          style={{ cursor: TOOL_CURSORS[tool] }}
        >
          <ActivableSvg
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize?.width}
            height={svgSize?.height}
            style={{
              width: svgSize?.width,
              height: svgSize?.height,
              backgroundImage: backgroundImage,
              backgroundColor: options.backgroundColor,
            }}
            activeElements={activeElements}
            setActiveElements={setActiveElements}
            getMousePoint={zoomableRef.current?.getMousePoint}
            setTool={setTool}
            zoom={zoom}
            tool={tool}
          >
            <g ref={elementsWrapperRef} />
            {activeElements.length <= 1 && dragElement && guideLines && (
              <GuideLines
                mouse={guideLines.mouse}
                guideLines={guideLines.guideLines}
                dragElement={dragElement}
                zoom={zoom}
                gridGap={Boolean(options.grid?.gap)}
                snapRadius={options.elements?.snapRadius}
              />
            )}
            {activeElements.length > 0 && (
              <ActiveElements
                activeElements={activeElements}
                elements={elements}
                options={options}
                zoomable={zoomableRef.current}
                zoom={zoom}
                tool={tool}
                setTool={setTool}
                updatedFromOutside={props.updatedFromOutside}
                setUpdated={props.setUpdated}
                setActiveElements={setActiveElements}
                draggedElement={draggedElement}
                setDraggedElement={setDraggedElement}
                setGuideLines={setGuideLines}
              />
            )}
          </ActivableSvg>
        </Zoomable>
      </Droppable>
    );
  }
);
