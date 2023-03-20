import useSetData from 'requests/mutations/useSetData';

import { useToast } from 'hooks/useToast';

import { Category } from 'models/category';

import Button from 'components/atoms/Button';

import * as S from './styles';

type DeleteCategoryModalProps = {
  category: Category;
  categoryType: string | null;
  closeModal: () => void;
};

const DeleteCategoryModal = ({
  category,
  categoryType,
  closeModal,
}: DeleteCategoryModalProps): JSX.Element => {
  const { setData } = useSetData();
  const { showToast } = useToast();

  const handleDeleteData = (category: Category): void => {
    try {
      const formattedCategoryType = categoryType?.toLowerCase();

      setData(`/categories/${formattedCategoryType}/${category.id}`, {
        ...category,
        active: false,
      });

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
        <Button onClick={() => handleDeleteData(category)} alert>
          Sim
        </Button>
        <Button onClick={closeModal}>Não</Button>
      </S.ButtonContainer>
    </>
  );
};

export default DeleteCategoryModal;
