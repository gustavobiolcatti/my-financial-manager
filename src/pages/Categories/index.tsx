import { useEffect, useState } from 'react';
import { SelectPicker } from 'rsuite';

import useGetData from 'requests/queries/useGetData';

import { Category } from 'models/category';
import { categoryTypeEnumTranslate } from 'models/enums/category-type-enum';

import AddButton from 'components/atoms/AddButton';
import EmptyBox from 'components/atoms/EmptyBox';
import TitleContainer from 'components/molecules/TitleContainer';
import CategoriesTable from 'components/molecules/CategoriesTable';
import ShowModal from 'components/molecules/Modal';

import * as S from './styles';

const Categories = (): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>();
  const [categoryType, setCategoryType] = useState<string | null>('EXPENSE');

  const [openModal, setOpenModal] = useState(false);

  const { getData } = useGetData();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getCategories = (type: string | null): void => {
    if (!type) return;

    getData(`/categories/${type.toLowerCase()}`, (snapshot) => {
      const data = snapshot.val();

      setCategories(Object.values(data));
    });
  };

  const categorySelectData = ['EXPENSE', 'INCOME'].map((item) => ({
    label: categoryTypeEnumTranslate(item),
    value: item,
  }));

  useEffect(() => {
    getCategories(categoryType);
  }, [categoryType]);

  return (
    <>
      <TitleContainer title="categorias">
        <AddButton onClick={handleOpenModal} />
      </TitleContainer>
      <S.Container>
        <SelectPicker
          data={categorySelectData}
          value={categoryType}
          onChange={(value) => setCategoryType(value)}
          style={{ width: '200px', marginBottom: '2em' }}
          searchable={false}
          cleanable={false}
        />
        {categories ? (
          <CategoriesTable categories={categories} />
        ) : (
          <EmptyBox />
        )}
        {openModal && (
          <ShowModal showModal={openModal} closeModal={handleCloseModal}>
            <h1>modal</h1>
          </ShowModal>
        )}
      </S.Container>
    </>
  );
};

export default Categories;
