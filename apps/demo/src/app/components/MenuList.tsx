import * as React from 'react';

import { ModalNew, ModalContact } from './modals/';

import type { SvgEditorRef } from '@pp-master-thesis/types';

import './MenuList.scss';

interface PropsMenu {
  children: React.ReactElement;
  title: string;
  index: number;
  open: number;
  setOpen: React.Dispatch<React.SetStateAction<number>>;
}

const Menu = ({ children, title, index, open, setOpen }: PropsMenu) => {
  const toggleMenu = () => {
    setOpen((prev) => (prev === index ? -1 : index));
  };

  const openMenu = () => {
    setOpen((prev) => (prev !== -1 ? index : prev));
  };

  return (
    <div
      onClick={toggleMenu}
      onMouseOver={openMenu}
      className={`menu${open === index ? ' menu--open' : ''}`}
    >
      <span>{title}</span>
      <div className="menu__content">{children}</div>
    </div>
  );
};

interface Props {
  activeElements: SVGGraphicsElement[];
  svgEditorRef: React.RefObject<SvgEditorRef>;
  gridHide: boolean;
  setGridHide: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuList = ({
  activeElements,
  svgEditorRef,
  gridHide,
  setGridHide,
}: Props) => {
  const listRef = React.useRef<HTMLUListElement>(null);
  const importRef = React.useRef<HTMLInputElement>(null);
  const [showModalNew, setShowModalNew] = React.useState(false);
  const [showModalContact, setShowModalContact] = React.useState(false);
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
    <>
      {showModalNew && (
        <ModalNew
          createNewEditor={svgEditorRef.current?.createNewEditor}
          close={() => setShowModalNew(false)}
        />
      )}
      {showModalContact && (
        <ModalContact close={() => setShowModalContact(false)} />
      )}
      <ul ref={listRef} className="editor__menu-list">
        <li className="editor__menu-list-item">
          <Menu title="File" index={0} {...commonProps}>
            <ul>
              <li onClick={() => setShowModalNew(true)}>New</li>
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
                    svgEditorRef.current?.import(
                      event.currentTarget.files?.[0]
                    );
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
              <li onClick={() => svgEditorRef.current?.selectAllElements()}>
                <span>Select All</span>
                <span>CTRL+A</span>
              </li>
              <hr />
              <li>
                <button
                  disabled={!activeElements.length}
                  onClick={() => svgEditorRef.current?.deleteElements()}
                >
                  <span>Delete</span>
                  <span>DELETE</span>
                </button>
              </li>
              <li>
                <button
                  disabled={!activeElements.length}
                  onClick={() => svgEditorRef.current?.copyElements()}
                >
                  <span>Copy</span>
                  <span>CTRL+C</span>
                </button>
              </li>
              <li>
                <button
                  disabled={!activeElements.length}
                  onClick={() => svgEditorRef.current?.cutElements()}
                >
                  <span>Cut</span>
                  <span>CTRL+X</span>
                </button>
              </li>
              <li>
                <button onClick={() => svgEditorRef.current?.pasteElements()}>
                  <span>Paste</span>
                  <span>CTRL+V</span>
                </button>
              </li>
            </ul>
          </Menu>
        </li>
        <li className="editor__menu-list-item">
          <Menu title="View" index={2} {...commonProps}>
            <ul>
              <li
                onClick={() => svgEditorRef.current?.zoomableRef?.resetView()}
              >
                Reset view
              </li>
              <li
                onClick={() => svgEditorRef.current?.zoomableRef?.resetZoom()}
              >
                Reset zoom
              </li>
              <hr />
              <li onClick={() => svgEditorRef.current?.zoomableRef?.zoomIn()}>
                <span>Zoom in</span>
                <span>Mousewheel</span>
              </li>
              <li onClick={() => svgEditorRef.current?.zoomableRef?.zoomOut()}>
                <span>Zoom out</span>
                <span>Mousewheel</span>
              </li>
              <hr />
              <li onClick={() => setGridHide((prev) => !prev)}>
                <span>Grid</span>
                <span>{!gridHide && <>&#10003;</>}</span>
              </li>
            </ul>
          </Menu>
        </li>
        <li className="editor__menu-list-item">
          <Menu title="Help" index={3} {...commonProps}>
            <ul>
              <li>
                <span>Version</span>
                <span>demo</span>
              </li>
              <li onClick={() => setShowModalContact(true)}>Contact</li>
            </ul>
          </Menu>
        </li>
      </ul>
    </>
  );
};
