import * as React from 'react';
import { Draggables, Loading, MenuList } from './components/';

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
  const [editorBackgroundColor, setEditorBackgroundColor] = React.useState('');
  const [backgroundOpacity, setBackgroundOpacity] = React.useState('0.1');
  const [zoom, setZoom] = React.useState(1);
  const [activeElements, setActiveElements] = React.useState<
    SVGGraphicsElement[]
  >([]);
  const [editorUpdated, setEditorUpdated] = React.useState(0);
  const [elementUpdated, setElementUpdated] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

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
      visible: visible,
      zoomOptions,
    }),
    [editorBackgroundColor, gridGap, guideLinesColor, visible, zoomOptions]
  );

  const zoomDropdown = [
    Math.round(zoom * 100),
    10,
    25,
    50,
    75,
    100,
    125,
    150,
    175,
    200,
    300,
    400,
    500,
  ];

  React.useEffect(() => {
    const rgb = hexToRgb(editorBackgroundColorPicker);
    setEditorBackgroundColor(
      `rgba(${rgb?.r},${rgb?.g},${rgb?.b},${backgroundOpacity})`
    );
  }, [editorBackgroundColorPicker, backgroundOpacity]);

  React.useEffect(() => {
    if (loaded) {
      setVisible(true);
      const svgWidth = 800;
      const svgHeight = 600;
      svgEditorRef.current?.createNewEditor(svgWidth, svgHeight);
    }
  }, [loaded]);

  React.useEffect(() => {
    if (!loaded && zoomOptions && editorOptions && backgroundOpacity) {
      setTimeout(() => setLoaded(true), 300);
    }
  }, [backgroundOpacity, editorOptions, loaded, zoomOptions]);

  return (
    <div className="editor">
      <div className="editor__menu">
        <MenuList svgEditorRef={svgEditorRef} options={editorOptions} />
      </div>
      {/* <div className="editor__options">
        <button
          onClick={() => svgEditorRef.current?.createNewEditor(1200, 800)}
        >
          Create new editor with 1200x800 size
        </button>
        <button
          onClick={() => svgEditorRef.current?.changeEditorSize(1200, 800)}
        >
          Change editor size to 1200x800
        </button>

        <span>Grid gap:</span>
        <input
          type="number"
          value={gridGap || ''}
          min={0}
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
      </div> */}
      <div className="editor__zoom-controls">
        <select
          onChange={(event) => {
            svgEditorRef.current?.zoomableRef?.zoomTo(
              Number(event.target.value)
            );
          }}
          value={zoom}
        >
          {zoomDropdown.map((value, i) => (
            <option
              key={i}
              style={i === 0 ? { display: 'none' } : {}}
              value={value / 100}
            >
              {value}%
            </option>
          ))}
        </select>
        <button onClick={() => svgEditorRef.current?.zoomableRef?.zoomIn()}>
          +
        </button>
        <button onClick={() => svgEditorRef.current?.zoomableRef?.zoomOut()}>
          -
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
      {!loaded && <Loading className="loading--editor" />}

      {activeElements.length ? (
        <ElementMenu
          elements={activeElements}
          updatedFromOutside={editorUpdated}
          setUpdated={setElementUpdated}
        />
      ) : (
        <div className="editor__options">
          Placeholder for editor options (visible when no element is selected)
        </div>
      )}
    </div>
  );
};

export default App;
