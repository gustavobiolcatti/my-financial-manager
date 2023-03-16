import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Input, SelectPicker } from 'rsuite';

import useGetData from 'requests/queries/useGetData';
import useSetData from 'requests/mutations/useSetData';

import { useToast } from 'hooks/useToast';

import { Category } from 'models/category';
import { categoryTypeEnumTranslate } from 'models/enums/category-type-enum';

import Button from 'components/atoms/Button';

import * as S from './styles';

type CategoryModalProps = {
  id: string;
  type: string | null;
  modalType: 'create' | 'update';
  closeModal: () => void;
};

const CategoryModal = ({
  id,
  type,
  modalType,
  closeModal,
}: CategoryModalProps): JSX.Element => {
  const [categoryType, setCategoryType] = useState<string | null>(type);

  const { showToast } = useToast();
  const { getData } = useGetData();
  const { setData } = useSetData();

  const formik = useFormik<Category>({
    initialValues: {
      id,
      name: '',
      color: '#000000',
    },
    onSubmit: (values) => {
      try {
        const data = {
          id: values.id,
          name: values.name,
          color: values.color,
        };

        const formattedCategoryType = categoryType?.toLowerCase();

        setData(`/categories/${formattedCategoryType}/${values.id}`, data);

        const toastMessage =
          modalType === 'create'
            ? 'Conta criada com sucesso'
            : 'Conta atualizada';

        showToast({ type: 'success', message: toastMessage });
        closeModal();
      } catch (error) {
        const err = error as Error;
        console.log('ERROR => ', err.message);

        const toastMessage =
          modalType === 'create'
            ? 'Erro ao criar conta'
            : 'Erro ao atualizar conta';

        showToast({ type: 'error', message: toastMessage });
      }
    },
  });

  const categorySelectData = ['EXPENSE', 'INCOME'].map((item) => ({
    label: categoryTypeEnumTranslate(item),
    value: item,
  }));

  useEffect(() => {
    if (modalType === 'create') return;

    const formattedCategoryType = categoryType?.toLowerCase();

    getData(`/categories/${formattedCategoryType}/${id}`, (snapshot) => {
      if (snapshot.exists()) {
        const categoryData = snapshot.val();

        formik.setValues({
          id: categoryData.id,
          name: categoryData.name,
          color: categoryData.color,
        });
      }
    });
  }, []);

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.Title id="modal-title">
        {modalType === 'create' ? 'Nova conta' : 'Editar conta'}
      </S.Title>

      <S.Label htmlFor="name">Nome da categoria</S.Label>
      <Input
        id="name"
        type="text"
        value={formik.values.name}
        onChange={(value) => formik.setFieldValue('name', value)}
        style={{
          padding: '.5em',
        }}
        required
      />

      {modalType !== 'update' && (
        <>
          <S.Label htmlFor="type">Tipo da categoria</S.Label>
          <SelectPicker
            id="type"
            data={categorySelectData}
            value={categoryType}
            onChange={(value) => setCategoryType(value)}
            searchable={false}
            cleanable={false}
            menuStyle={{ zIndex: 1300 }}
          />
        </>
      )}

      <S.Label htmlFor="color">Saldo inicial</S.Label>
      <Input
        id="color"
        type="color"
        value={formik.values.color}
        onChange={(value) => formik.setFieldValue('color', value)}
        style={{ height: '3em' }}
      />

      <S.ButtonContainer>
        <Button type="submit" alert>
          {modalType === 'create' ? 'Criar' : 'Atualizar'}
        </Button>
        <Button onClick={closeModal}>Cancelar</Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default CategoryModal;
