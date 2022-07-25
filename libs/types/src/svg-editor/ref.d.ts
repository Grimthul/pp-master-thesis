import { ZoomableRef } from '../zoomable';

export interface SvgEditorRef {
  zoomableRef: ZoomableRef | null;
  createNewEditor: (width: number, height: number) => void;
  changeEditorSize: (width: number, height: number) => void;
  import: (file?: File) => void;
  export: (extension: 'svg' | 'png') => void;
  selectAllElements: () => void;
  deleteElements: () => void;
  copyElements: () => void;
  cutElements: () => void;
  pasteElements: () => void;
}
