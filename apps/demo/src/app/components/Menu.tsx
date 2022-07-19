import * as React from 'react';

import './Menu.scss';

interface Props {
  children: React.ReactElement;
  title: string;
  index: number;
  open: number;
  setOpen: React.Dispatch<React.SetStateAction<number>>;
}

export const Menu = ({ children, title, index, open, setOpen }: Props) => {
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
