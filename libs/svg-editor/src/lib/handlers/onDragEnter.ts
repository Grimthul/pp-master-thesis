import { updateDragImage } from '../utils/dragImage';

export const onDragEnter = (dragImage: HTMLDivElement, zoom: number) =>
  updateDragImage(dragImage, zoom);
