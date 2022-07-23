import * as React from 'react';

interface Props {
  dragImageStyle?: React.CSSProperties;
  dragImageRef?: React.RefObject<HTMLDivElement>;
  onDragStart?(event: React.DragEvent): void;
  onDrag?(event: React.DragEvent): void;
  children: React.ReactElement;
}

/**
 * Creates a draggable object from children.
 */
export const Draggable = (props: Props) => {
  const { dragImageStyle, dragImageRef, children } = props;
  const [showDragImage, setShowDragImage] = React.useState(false);

  const onDragStart = (event: React.DragEvent) => {
    setShowDragImage(true);
    if (props.onDragStart) props.onDragStart(event);
  };

  const onDrag = (event: React.DragEvent) => {
    if (props.onDrag) props.onDrag(event);
  };

  const onDragEnd = () => setShowDragImage(false);
  const shouldRenderImage = showDragImage;
  return (
    <>
      <div
        className="draggable"
        draggable={true}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        {children}
      </div>
      {shouldRenderImage && <div ref={dragImageRef} style={dragImageStyle} />}
    </>
  );
};
