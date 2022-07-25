export interface ActiveElementsActionProps {
  elements: SVGGraphicsElement[];
  activeElements: SVGGraphicsElement[];
  elementsWrapperRef: React.RefObject<SVGGraphicsElement>;
  setActiveElements: React.Dispatch<React.SetStateAction<SVGGraphicsElement[]>>;
  elementsToCopy: SVGGraphicsElement[];
  setElementsToCopy: React.Dispatch<React.SetStateAction<SVGGraphicsElement[]>>;
}
