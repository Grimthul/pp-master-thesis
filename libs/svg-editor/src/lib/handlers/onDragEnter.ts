import { updateDragElement } from '../utils/';

export const onDragEnter = (dragImage: HTMLDivElement, zoom: number) =>
  updateDragElement(dragImage, zoom);
