import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { uuidv4 } from '@firebase/util';
import { Input, SelectPicker } from 'rsuite';

import useSetData from 'requests/mutations/useSetData';

import { useToast } from 'hooks/useToast';

import { Category } from 'models/category';
import { categoryTypeEnumTranslate } from 'models/enums/category-type-enum';

import Button from 'components/atoms/Button';
import FormLabel from 'components/atoms/FormLabel';
import Form from 'components/molecules/Form';
import InputGroup from 'components/molecules/InputGroup';
import ButtonWrapper from 'components/molecules/ButtonWrapper';

type CategoryModalProps = {
  category?: Category;
  type: string | null;
  modalType: 'create' | 'update';
  closeModal: () => void;
};

const CategoryModal = ({
  category,
  type,
  modalType,
  closeModal,
}: CategoryModalProps): JSX.Element => {
  const [categoryType, setCategoryType] = useState<string | null>(type);

  const { showToast } = useToast();
  const { setData } = useSetData();

  const formik = useFormik<Category>({
    initialValues: {
      id: uuidv4(),
      name: '',
      color: '#000000',
      active: true,
    },
    onSubmit: (values) => {
      try {
        const data = {
          id: values.id,
          name: values.name,
          color: values.color,
          active: Boolean(true),
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

  const fillCategoryFormik = (): void => {
    if (!category) return;

    formik.setValues({
      id: category.id,
      name: category.name,
      color: category.color,
      active: Boolean(category.active),
    });
  };

  useEffect(() => {
    if (modalType === 'update') {
      fillCategoryFormik();
    }
  }, []);

  return (
    <Form
      title={modalType === 'create' ? 'Nova categoria' : 'Editar categoria'}
      onSubmit={formik.handleSubmit}
    >
      <InputGroup>
        <FormLabel htmlFor="name">Nome</FormLabel>
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
      </InputGroup>

      {modalType !== 'update' && (
        <InputGroup singleColumn>
          <FormLabel htmlFor="type">Tipo</FormLabel>
          <SelectPicker
            id="type"
            data={categorySelectData}
            value={categoryType}
            onChange={(value) => setCategoryType(value)}
            searchable={false}
            cleanable={false}
          />
        </InputGroup>
      )}

      <InputGroup singleColumn={modalType !== 'update'}>
        <FormLabel htmlFor="color">Cor</FormLabel>
        <Input
          id="color"
          type="color"
          value={formik.values.color}
          onChange={(value) => formik.setFieldValue('color', value)}
          style={{ height: '3em' }}
        />
      </InputGroup>

      <ButtonWrapper>
        <Button type="submit" alert>
          {modalType === 'create' ? 'Criar' : 'Atualizar'}
        </Button>
        <Button onClick={closeModal}>Cancelar</Button>
      </ButtonWrapper>
    </Form>
  );
};

export default CategoryModal;
