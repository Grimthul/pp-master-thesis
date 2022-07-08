const transformString = (
  zoom: number,
  translateX: number,
  translateY: number
) => `scale(${zoom}) translate(${translateX}px, ${translateY}px)`;

const countTranslate = (size: number, zoom: number) =>
  Math.abs(size * zoom - size) / 2 / (zoom < 1 ? -zoom : zoom);

export const updateDragElement = (
  dragElement: HTMLDivElement,
  zoom: number,
  tx = 0,
  ty = 0
) => {
  const dragElementTransform = dragElement.style.transform;

  const { width: dragElementWidth, height: dragElementHeight } =
    dragElement.getBoundingClientRect();

  const translateX = countTranslate(dragElementWidth, zoom) + tx;
  const translateY = countTranslate(dragElementHeight, zoom) + ty;
  if (!dragElementTransform || tx || ty) {
    dragElement.style.transform = transformString(zoom, translateX, translateY);
  }
};
