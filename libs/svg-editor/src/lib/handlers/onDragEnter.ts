import { updateDragImage } from '../utils/';

export const onDragEnter = (dragImage: HTMLDivElement, zoom: number) =>
  updateDragImage(dragImage, zoom);
