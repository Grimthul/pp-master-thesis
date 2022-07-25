import * as React from 'react';
import './Modal.scss';

interface Props {
  name: string;
  title?: string;
  closeModal: () => void;
  children: React.ReactElement;
}

export const Modal = ({ title, name, children, closeModal }: Props) => {
  React.useEffect(() => {
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [closeModal]);

  return (
    <div className="overlay">
      <div className={`modal ${name}`}>
        <div className="modal__header">
          {title && <h3 className="modal__title">{title}</h3>}
          <button className="modal__close-btn" onClick={closeModal}>
            X
          </button>
        </div>
        <hr />
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};
