import useDeleteData from 'requests/mutations/useDeleteData';

import { useToast } from 'hooks/useToast';

import Button from 'components/atoms/Button';

import { formatDateWithDateFns } from 'utils/formatDate';

import * as S from './styles';

type DeleteTransationModalProps = {
  id: string;
  transationDate: Date | null;
  closeModal: () => void;
};

const DeleteTransationModal = ({
  id,
  transationDate,
  closeModal,
}: DeleteTransationModalProps): JSX.Element => {
  const { deleteData } = useDeleteData();
  const { showToast } = useToast();

  const handleDeleteData = (): void => {
    try {
      if (!transationDate) return;
      const urlFormattedDate = formatDateWithDateFns(transationDate, 'MM-yyyy');

      deleteData(`/transations/${urlFormattedDate}/${id}`);

      closeModal();

      showToast({ type: 'success', message: 'Categoria excluída' });
    } catch (error) {
      const err = error as Error;

      console.log('ERROR => ', err.message);
      showToast({ type: 'error', message: 'Erro ao realizar exclusão' });
    }
  };

  return (
    <>
      <S.Title id="modal-title">
        Deseja mesmo mesmo excluir a transação?
      </S.Title>
      <S.ButtonContainer>
        <Button onClick={handleDeleteData} alert>
          Sim
        </Button>
        <Button onClick={closeModal}>Não</Button>
      </S.ButtonContainer>
    </>
  );
};

export default DeleteTransationModal;
