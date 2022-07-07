import { Tool } from '@pp-master-thesis/enums';

interface Props {
  activeElements: SVGGraphicsElement[];
  setTool: React.Dispatch<React.SetStateAction<Tool>>;
}

export const ActiveElements = ({ activeElements }: Props) => {
  return (
    <>
      {activeElements.map((element, i) => {
        return <circle key={i}></circle>;
      })}
    </>
  );
};
