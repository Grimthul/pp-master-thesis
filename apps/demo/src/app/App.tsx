import * as React from 'react';
import { Draggables } from './components/';

import { SvgEditor } from '@pp-master-thesis/svg-editor';
import { SvgEditorOptions, ZoomOptions } from '@pp-master-thesis/types';
import { hexToRgb } from '@pp-master-thesis/utils';
import { ElementMenu } from '@pp-master-thesis/element-menu';

import type { SvgEditorRef } from '@pp-master-thesis/types';

import './App.scss';

const App = () => {
  const dragImageRef = React.useRef<HTMLDivElement>(null);
  const svgEditorRef = React.useRef<SvgEditorRef>(null);
  const [gridGap, setGridGap] = React.useState(10);
  const [guideLinesColor, setGuideLinesColor] = React.useState('#cccccc');
  const [editorBackgroundColorPicker, setEditorBackgroundColorPicker] =
    React.useState('#aaaa1e');
  const [editorBackgroundColor, setEditorBackgroundColor] = React.useState(
    editorBackgroundColorPicker
  );
  const [backgroundOpacity, setBackgroundOpacity] = React.useState('0.1');
  const [zoom, setZoom] = React.useState(1);
  const [activeElements, setActiveElements] = React.useState<
    SVGGraphicsElement[]
  >([]);
  const [editorUpdated, setEditorUpdated] = React.useState(0);
  const [elementUpdated, setElementUpdated] = React.useState(0);

  const zoomOptions: ZoomOptions = React.useMemo(
    () => ({
      onZoomChange: (zoom: number) => setZoom(zoom),
      // onToolChange: React.useCallback((tool: Tool) => setTool(tool), []),
    }),
    []
  );

  const editorOptions: SvgEditorOptions = React.useMemo(
    () => ({
      backgroundColor: editorBackgroundColor,
      grid: {
        gap: gridGap,
        color: guideLinesColor,
      },
      zoomOptions,
    }),
    [editorBackgroundColor, gridGap, guideLinesColor, zoomOptions]
  );

  React.useEffect(() => {
    const rgb = hexToRgb(editorBackgroundColorPicker);
    setEditorBackgroundColor(
      `rgba(${rgb?.r},${rgb?.g},${rgb?.b},${backgroundOpacity})`
    );
  }, [editorBackgroundColorPicker, backgroundOpacity]);

  return (
    <div className="editor">
      <div className="editor__options">
        <div>{zoom * 100}%</div>
        <button onClick={() => svgEditorRef.current?.zoomableRef?.resetZoom()}>
          Reset zoom
        </button>
        <button onClick={() => svgEditorRef.current?.zoomableRef?.resetView()}>
          Reset view
        </button>
        <button onClick={() => svgEditorRef.current?.zoomableRef?.zoomIn()}>
          Zoom in
        </button>
        <button onClick={() => svgEditorRef.current?.zoomableRef?.zoomOut()}>
          Zoom out
        </button>
        <button onClick={() => svgEditorRef.current?.zoomableRef?.zoomTo(2)}>
          Zoom to 200%
        </button>
        <button onClick={() => svgEditorRef.current?.zoomableRef?.zoomTo(5)}>
          Zoom to 500%
        </button>
        <span>Grid gap:</span>
        <input
          type="number"
          value={gridGap || ''}
          onChange={(e) => setGridGap(Number(e.target.value))}
        />

        <input
          type="color"
          value={guideLinesColor}
          onChange={(e) => setGuideLinesColor(e.target.value)}
        />
        <input
          type="color"
          value={editorBackgroundColorPicker}
          onChange={(e) => setEditorBackgroundColorPicker(e.target.value)}
        />
        <span>Editor background opacity:</span>

        <input
          type="number"
          step="0.1"
          max="1"
          min="0"
          value={backgroundOpacity}
          onChange={(e) => setBackgroundOpacity(e.target.value)}
        />
        <button onClick={() => svgEditorRef.current?.zoomableRef?.zoomTo(5)}>
          Zoom to 500%
        </button>
      </div>
      <div className="editor__tools">
        <Draggables dragImageRef={dragImageRef} />
      </div>

      <SvgEditor
        ref={svgEditorRef}
        options={editorOptions}
        dragImageRef={dragImageRef}
        setActiveElements={setActiveElements}
        updatedFromOutside={elementUpdated}
        setUpdated={setEditorUpdated}
      />

      <ElementMenu
        elements={activeElements}
        updatedFromOutside={editorUpdated}
        setUpdated={setElementUpdated}
      />
    </div>
  );
};

export default App;
