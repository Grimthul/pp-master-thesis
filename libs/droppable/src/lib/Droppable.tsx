import * as React from 'react';

interface Props {
  id?: string;
  droppableRef?: React.RefObject<HTMLDivElement>;
  onDrop(event: React.DragEvent): void;
  onDragEnter?(event: React.DragEvent): void;
  onDragOver?(event: React.DragEvent): void;
  children: React.ReactElement;
}

export const Droppable = ({
  id,
  droppableRef,
  onDrop,
  onDragEnter,
  onDragOver,
  children,
}: Props) => {
  const allowDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      id={id}
      className={'droppable'}
      ref={droppableRef}
      onDrop={onDrop}
      onDragOver={(event) => {
        allowDrop(event);
        if (onDragOver) onDragOver(event);
      }}
      onDragEnter={(event) => {
        allowDrop(event);
        if (onDragEnter) onDragEnter(event);
      }}
    >
      {children}
    </div>
  );
};
