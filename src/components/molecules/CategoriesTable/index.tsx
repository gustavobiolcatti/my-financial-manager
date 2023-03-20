import { useState } from 'react';

import { Category } from 'models/category';

import ActionButton from 'components/atoms/ActionButton';
import CategoryModal from 'components/atoms/CategoryModal';
import DeleteCategoryModal from 'components/atoms/DeleteCategoryModal';
import ShowModal from 'components/molecules/Modal';

import * as S from './styles';

type CategoriesTableProps = {
  categories: Category[];
  categoryType: string | null;
};
const CategoriesTable = ({
  categories,
  categoryType,
}: CategoriesTableProps): JSX.Element => {
  const [category, setCategory] = useState<Category>();

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (category: Category, type: 'delete' | 'update') => {
    setModalType(type);
    setCategory(category);
    setOpenModal(true);
  };

  return (
    <>
      <S.Table>
        <thead>
          <tr>
            <S.TableHeadColumn>nome</S.TableHeadColumn>
            <S.TableHeadColumn>cor</S.TableHeadColumn>
            <S.TableHeadColumn>opções</S.TableHeadColumn>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <S.TableColumn>{category.name}</S.TableColumn>
              <S.TableColumn>
                <S.CategoryColor color={category.color} />
              </S.TableColumn>
              <S.TableColumn>
                <S.ActionButtonWrapper>
                  <ActionButton
                    actionType="update"
                    onClick={() => handleOpenModal(category, 'update')}
                  />
                  <ActionButton
                    actionType="delete"
                    onClick={() => handleOpenModal(category, 'delete')}
                  />
                </S.ActionButtonWrapper>
              </S.TableColumn>
            </tr>
          ))}
        </tbody>
      </S.Table>
      {openModal && (
        <ShowModal showModal={openModal} closeModal={() => setOpenModal(false)}>
          {modalType === 'update' && category ? (
            <CategoryModal
              category={category}
              modalType="update"
              type={categoryType}
              closeModal={() => setOpenModal(false)}
            />
          ) : (
            category && (
              <DeleteCategoryModal
                category={category}
                categoryType={categoryType}
                closeModal={() => setOpenModal(false)}
              />
            )
          )}
        </ShowModal>
      )}
    </>
  );
};

export default CategoriesTable;
