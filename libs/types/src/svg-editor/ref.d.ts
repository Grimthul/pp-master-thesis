import { ZoomableRef } from '../zoomable';

export interface SvgEditorRef {
  zoomableRef: ZoomableRef | null;
  createNewEditor: (width: number, height: number) => void;
}
