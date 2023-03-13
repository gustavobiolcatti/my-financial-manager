import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ExitModal from 'components/atoms/ExitModal';
import NewAccountModal from 'components/atoms/NewAccountModal';

type UseModalReturn = {
  showModal: ({ type, showModal, closeModal }: ModalProps) => JSX.Element;
};
type ModalProps = {
  type: 'exit' | 'new-account';
  showModal: boolean;
  closeModal: () => void;
};

const useModal = (): UseModalReturn => {
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

  const showModal = ({
    type,
    showModal,
    closeModal,
  }: ModalProps): JSX.Element => {
    const modalType = {
      exit: <ExitModal closeModal={closeModal} />,
      'new-account': <NewAccountModal closeModal={closeModal} />,
    };

    return (
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="modal-title"
      >
        <Box sx={style}>{modalType[type]}</Box>
      </Modal>
    );
  };

  return { showModal };
};

export default useModal;
