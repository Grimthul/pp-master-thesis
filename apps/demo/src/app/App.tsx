import React from 'react';
import { Draggables } from './components/';

import { SvgEditor } from '@pp-master-thesis/svg-editor';

import './App.scss';

const App = () => {
  const dragImageRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      {/*<div>{zoom * 100}%</div>*/}
      {/*<div>Tool: {tool}</div>*/}
      {/*<div>*/}
      {/*  SVG moved to: {svgStart.x},{svgStart.y}*/}
      {/*</div>*/}

      {/*<button onClick={() => zoomableRef.current?.resetZoom()}>*/}
      {/*  Reset zoom*/}
      {/*</button>*/}
      {/*<button onClick={() => zoomableRef.current?.resetView()}>*/}
      {/*  Reset view*/}
      {/*</button>*/}
      {/*<button onClick={() => zoomableRef.current?.zoomIn()}>Zoom in</button>*/}
      {/*<button onClick={() => zoomableRef.current?.zoomOut()}>Zoom out</button>*/}
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    zoomableRef.current?.zoomTo(5);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Zoom to 500%*/}
      {/*</button>*/}
      <Draggables dragImageRef={dragImageRef} />
      <SvgEditor
        options={{
          editorBackgroundColor: 'rgba(170, 170, 30, 0.1)',
          guideLines: {
            gap: 10,
          },
        }}
        dragImageRef={dragImageRef}
      />
    </>
  );
};

export default App;
