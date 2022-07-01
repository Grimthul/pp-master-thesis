const transformString = (
  zoom: number,
  translateX: number,
  translateY: number
) => `scale(${zoom}) translate(${translateX}px, ${translateY}px)`;

const countTranslate = (size: number, zoom: number) =>
  Math.abs(size * zoom - size) / 2 / (zoom < 1 ? -zoom : zoom);

export const updateDragImage = (
  dragImage: HTMLDivElement,
  zoom: number,
  tx = 0,
  ty = 0
) => {
  const dragImageTransform = dragImage.style.transform;

  const { width: dragImageWidth, height: dragImageHeight } =
    dragImage.getBoundingClientRect();

  const translateX = countTranslate(dragImageWidth, zoom) + tx;
  const translateY = countTranslate(dragImageHeight, zoom) + ty;
  if (!dragImageTransform || tx || ty) {
    dragImage.style.transform = transformString(zoom, translateX, translateY);
  }
};
