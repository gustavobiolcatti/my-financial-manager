import { useEffect, useState } from 'react';
import { SelectPicker } from 'rsuite';
import { uuidv4 } from '@firebase/util';

import useGetData from 'requests/queries/useGetData';

import { Category } from 'models/category';
import { categoryTypeEnumTranslate } from 'models/enums/category-type-enum';

import AddButton from 'components/atoms/AddButton';
import EmptyBox from 'components/atoms/EmptyBox';
import CategoryModal from 'components/atoms/CategoryModal';
import TitleContainer from 'components/molecules/TitleContainer';
import CategoriesTable from 'components/molecules/CategoriesTable';
import ShowModal from 'components/molecules/Modal';

import * as S from './styles';

const Categories = (): JSX.Element => {
  const [categories, setCategories] = useState<Category[]>();
  const [categoryType, setCategoryType] = useState<string | null>('EXPENSE');

  const [openModal, setOpenModal] = useState(false);

  const { getData } = useGetData();

  const getCategories = (type: string | null): void => {
    if (!type) return;

    const formattedCategoryType = type.toLowerCase();

    getData(`/categories/${formattedCategoryType}`, (snapshot) => {
      const data: Category[] = Object.values(snapshot.val());

      const activeCategories = data.filter(
        (category) => category.active === true,
      );

      setCategoryType(type);
      setCategories(activeCategories);
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
        <AddButton onClick={() => setOpenModal(true)} />
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
          <CategoriesTable
            categoryType={categoryType}
            categories={categories}
          />
        ) : (
          <EmptyBox />
        )}
        {openModal && (
          <ShowModal
            showModal={openModal}
            closeModal={() => setOpenModal(false)}
          >
            <CategoryModal
              type={categoryType}
              modalType="create"
              closeModal={() => setOpenModal(false)}
            />
          </ShowModal>
        )}
      </S.Container>
    </>
  );
};

export default Categories;
