import { ReactNode } from 'react';
import Modal from '@mui/material/Modal';

import * as S from './styles';

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
  children: ReactNode;
};

const ShowModal = ({
  showModal,
  closeModal,
  children,
}: ModalProps): JSX.Element => {
  return (
    <Modal open={showModal} onClose={closeModal} aria-labelledby="modal-title">
      <S.Box>{children}</S.Box>
    </Modal>
  );
};

export default ShowModal;
