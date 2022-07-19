import { Modal } from './Modal';

interface Props {
  close: () => void;
}
export const ModalContact = ({ close }: Props) => {
  return (
    <Modal title="Contact" name="contact" closeModal={close}>
      <>
        <div>Support e-mail: </div>
        <div>...</div>
      </>
    </Modal>
  );
};
