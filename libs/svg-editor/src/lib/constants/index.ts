import { Tool } from '@pp-master-thesis/enums';

export const TOOL_CURSORS = {
  [Tool.NONE]: 'default',
  [Tool.PAN]: 'move',
  [Tool.ZOOM]: 'zoom',
  [Tool.NW_RESIZE]: 'nw-resize',
  [Tool.SW_RESIZE]: 'sw-resize',
  [Tool.NE_RESIZE]: 'ne-resize',
  [Tool.SE_RESIZE]: 'se-resize',
  [Tool.W_RESIZE]: 'w-resize',
  [Tool.E_RESIZE]: 'e-resize',
  [Tool.N_RESIZE]: 'n-resize',
  [Tool.S_RESIZE]: 's-resize',
  [Tool.PATH_MOVE_POINT]: 'crosshair',
  [Tool.SELECTING_ELEMENTS]: 'crosshair',
};
