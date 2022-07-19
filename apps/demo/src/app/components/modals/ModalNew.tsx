import * as React from 'react';

import { Modal } from './Modal';

import './ModalNew.scss';

interface Props {
  createNewEditor: ((width: number, height: number) => void) | undefined;
  close: () => void;
}
export const ModalNew = ({ close, createNewEditor }: Props) => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  return (
    <Modal name="new" title={'New SVG'} closeModal={close}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (createNewEditor) createNewEditor(width, height);
          close();
        }}
      >
        <div>
          Width:&nbsp;
          <input
            min={0}
            value={width || ''}
            onChange={(event) => setWidth(Number(event.target.value))}
            required={true}
            type="number"
          />
          px
        </div>
        <div>
          Height:
          <input
            min={0}
            value={height || ''}
            onChange={(event) => setHeight(Number(event.target.value))}
            required={true}
            type="number"
          />
          px
        </div>
        <button type="submit">Create</button>
      </form>
    </Modal>
  );
};
