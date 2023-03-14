import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
  const style = {
    position: 'absolute' as 'absolute',

    padding: '2em',

    top: '50%',
    left: '50%',

    borderRadius: '10px',

    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={showModal} onClose={closeModal} aria-labelledby="modal-title">
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ShowModal;
