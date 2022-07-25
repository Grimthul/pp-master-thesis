import { translateElement } from './svg';

import type { ActiveElementsActionProps } from '../types';

export const deleteElements = ({
  activeElements: elements,
  setActiveElements,
}: ActiveElementsActionProps) => {
  elements.forEach((element) => element.parentElement?.removeChild(element));
  setActiveElements([]);
};

export const copyElements = ({
  activeElements: elements,
  setElementsToCopy,
}: ActiveElementsActionProps) => setElementsToCopy(elements);

export const cutElements = ({
  activeElements: elements,
  setActiveElements,
  setElementsToCopy,
}: ActiveElementsActionProps) => {
  setElementsToCopy(elements);
  elements.forEach((element) => element.parentElement?.removeChild(element));
  setActiveElements([]);
};

export const pasteElements = ({
  elementsWrapperRef,
  setActiveElements,
  elementsToCopy,
  setElementsToCopy,
}: ActiveElementsActionProps) => {
  setActiveElements([]);
  const copiedElements = elementsToCopy.map((element) => {
    const elementCopy = element.cloneNode(true) as SVGGraphicsElement;
    translateElement(elementCopy, 10, 10);
    elementsWrapperRef.current?.appendChild(elementCopy);
    return elementCopy;
  });
  setActiveElements(copiedElements);
  setElementsToCopy(copiedElements);
};

export const selectAll = ({
  elements,
  setActiveElements,
}: ActiveElementsActionProps) => setActiveElements(elements);
