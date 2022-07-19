import * as React from 'react';

import './EditorOptions.scss';

interface Props {
  gridGap: number;
  setGridGap: React.Dispatch<React.SetStateAction<number>>;
  gridHide: boolean;
  setGridHide: React.Dispatch<React.SetStateAction<boolean>>;
  guideLinesColor: string;
  setGuideLinesColor: React.Dispatch<React.SetStateAction<string>>;
  editorBackgroundColorPicker: string;
  setEditorBackgroundColorPicker: React.Dispatch<React.SetStateAction<string>>;
  backgroundOpacity: string;
  setBackgroundOpacity: React.Dispatch<React.SetStateAction<string>>;
}

export const EditorOptions = ({
  gridGap,
  setGridGap,
  gridHide,
  setGridHide,
  guideLinesColor,
  setGuideLinesColor,
  editorBackgroundColorPicker,
  setEditorBackgroundColorPicker,
  backgroundOpacity,
  setBackgroundOpacity,
}: Props) => {
  return (
    <div className="editor__options">
      <div>
        Grid gap:
        <input
          type="checkbox"
          checked={!gridHide}
          onChange={() => setGridHide((prev) => !prev)}
        />
        <input
          type="number"
          value={gridGap || ''}
          min={0}
          onChange={(e) => setGridGap(Number(e.target.value))}
        />
      </div>
      <div>
        Grid line color:
        <input
          type="color"
          value={guideLinesColor}
          onChange={(e) => setGuideLinesColor(e.target.value)}
        />
      </div>
      <div>
        Background color:
        <input
          type="color"
          value={editorBackgroundColorPicker}
          onChange={(e) => setEditorBackgroundColorPicker(e.target.value)}
        />
      </div>

      <div>
        Background opacity:
        <input
          type="number"
          step="0.1"
          max="1"
          min="0"
          value={backgroundOpacity}
          onChange={(e) => setBackgroundOpacity(e.target.value)}
        />
      </div>
    </div>
  );
};
