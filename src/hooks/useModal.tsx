import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import ExitModal from 'components/atoms/ExitModal';

type UseModalReturn = {
  showModal: ({ type, showModal, closeModal }: ModalProps) => JSX.Element;
};
type ModalProps = {
  type?: 'exit';
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
    return (
      <Modal
        open={showModal}
        onClose={closeModal}
        aria-labelledby="modal-title"
      >
        <Box sx={style}>
          {(() => {
            switch (type) {
              case 'exit':
                return <ExitModal closeModal={closeModal} />;
            }
          })()}
        </Box>
      </Modal>
    );
  };

  return { showModal };
};

export default useModal;
