import useDeleteData from 'requests/mutations/useDeleteData';

import { useToast } from 'hooks/useToast';

import Button from 'components/atoms/Button';

import * as S from './styles';

type DeleteCategoryModalProps = {
  id: string;
  categoryType: string | null;
  closeModal: () => void;
};

const DeleteCategoryModal = ({
  id,
  categoryType,
  closeModal,
}: DeleteCategoryModalProps): JSX.Element => {
  const { deleteData } = useDeleteData();
  const { showToast } = useToast();

  const handleDeleteData = (): void => {
    try {
      const formattedCategoryType = categoryType?.toLowerCase();

      deleteData(`/categories/${formattedCategoryType}/${id}`);

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
        Deseja mesmo mesmo excluir a categoria?
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

export default DeleteCategoryModal;
