import * as React from 'react';

import { Menu } from './Menu';

import { SvgEditorOptions, SvgEditorRef } from '@pp-master-thesis/types';

import './MenuList.scss';

interface Props {
  svgEditorRef: React.RefObject<SvgEditorRef>;
  options: SvgEditorOptions;
}

export const MenuList = ({ svgEditorRef }: Props) => {
  const listRef = React.useRef<HTMLUListElement>(null);
  const importRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(-1);
  const commonProps = { open, setOpen };

  React.useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!listRef.current?.contains(event.target as Node)) setOpen(-1);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  });

  return (
    <ul ref={listRef} className="editor__menu-list">
      <li className="editor__menu-list-item">
        <Menu title="File" index={0} {...commonProps}>
          <ul>
            <li onClick={() => console.log('not yet implemented')}>New</li>
            <li onClick={() => svgEditorRef.current?.export('svg')}>
              Export to SVG
            </li>
            <li onClick={() => svgEditorRef.current?.export('png')}>
              Export to PNG
            </li>
            <hr />
            <li onClick={() => importRef.current?.click()}>
              Import
              <input
                ref={importRef}
                className={'editor__import'}
                onInput={(event) => {
                  svgEditorRef.current?.import(event.currentTarget.files?.[0]);
                  event.currentTarget.value = '';
                }}
                type="file"
                accept=".svg"
              />
            </li>
          </ul>
        </Menu>
      </li>
      <li className="editor__menu-list-item">
        <Menu title="Edit" index={1} {...commonProps}>
          <ul>
            <li onClick={() => svgEditorRef.current?.zoomableRef?.resetZoom()}>
              Reset zoom
            </li>
            <hr />
            <li onClick={() => svgEditorRef.current?.zoomableRef?.zoomIn()}>
              Zoom in
            </li>
            <li onClick={() => svgEditorRef.current?.zoomableRef?.zoomOut()}>
              Zoom out
            </li>
          </ul>
        </Menu>
      </li>
      <li className="editor__menu-list-item">
        <Menu title="View" index={2} {...commonProps}>
          <ul>
            <li onClick={() => svgEditorRef.current?.zoomableRef?.resetView()}>
              Reset view
            </li>
            <hr />
            <li onClick={() => console.log('not yet implemented')}>
              Grid toggle
            </li>
            <li onClick={() => console.log('not yet implemented')}>
              Guide lines toggle
            </li>
          </ul>
        </Menu>
      </li>
      <li className="editor__menu-list-item">
        <Menu title="Help" index={3} {...commonProps}>
          <ul>
            <li onClick={() => console.log('not yet implemented')}>Contact</li>
          </ul>
        </Menu>
      </li>
    </ul>
  );
};
