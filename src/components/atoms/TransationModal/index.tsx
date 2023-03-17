import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { DatePicker, Input, SelectPicker } from 'rsuite';

import useGetData from 'requests/queries/useGetData';
import useSetData from 'requests/mutations/useSetData';

import { useToast } from 'hooks/useToast';

import { Account } from 'models/account';
import { Transation } from 'models/transation';
import { transationTypeEnumTranslate } from 'models/enums/transation-type-enum';
import { Category } from 'models/category';

import Button from 'components/atoms/Button';

import { capitalizeFirstLetterOfEachWorlds } from 'utils/capitalizeFirstLetterOfEachWorlds';
import { formatDateWithDateFns } from 'utils/formatDate';

import * as S from './styles';

type TransationModalProps = {
  id: string;
  transationDate?: Date | null;
  modalType: 'create' | 'update';
  closeModal: () => void;
};

const TransationModal = ({
  id,
  transationDate,
  modalType,
  closeModal,
}: TransationModalProps): JSX.Element => {
  const [categorySelectData, setCategorySelectData] = useState([
    { label: '', value: '' },
  ]);
  const [accountSelectData, setAccountSelectData] = useState([
    { label: '', value: '' },
  ]);
  const [accounts, setAccounts] = useState();
  const [sellectedAccount, setSellectedAccount] = useState<Account | null>(
    null,
  );

  const { showToast } = useToast();
  const { getData } = useGetData();
  const { setData } = useSetData();

  const formik = useFormik<Transation>({
    initialValues: {
      id,
      date: new Date(),
      type: 'EXPENSE',
      categoryId: '',
      description: '',
      accountId: '',
      value: '',
    },
    onSubmit: (values) => {
      try {
        if (
          !values.categoryId ||
          !values.accountId ||
          !values.value ||
          !sellectedAccount
        ) {
          showToast({
            type: 'error',
            message: 'Preencha todos os campos antes de seguir',
          });
          return;
        }

        const urlFormattedDate = formatDateWithDateFns(values.date, 'MM-yyyy');

        const data = {
          id: values.id,
          date: new Date(values.date).toISOString(),
          type: values.type,
          categoryId: values.categoryId,
          description: values.description,
          accountId: values.accountId,
          value: Number(values.value),
        };

        let newBalance = 0;

        if (values.type === 'EXPENSE') {
          newBalance = Number(sellectedAccount.balance) - Number(values.value);
        } else {
          newBalance = Number(sellectedAccount.balance) + Number(values.value);
        }

        setData(`/transations/${urlFormattedDate}/${values.id}`, data);
        setData(`/accounts/${values.accountId}`, {
          ...sellectedAccount,
          balance: newBalance,
        });

        const toastMessage =
          modalType === 'create'
            ? 'Transação criada com sucesso'
            : 'Transação atualizada';

        showToast({ type: 'success', message: toastMessage });
        closeModal();
      } catch (error) {
        const err = error as Error;
        console.log('ERROR => ', err.message);

        const toastMessage =
          modalType === 'create'
            ? 'Erro ao criar transação'
            : 'Erro ao atualizar transação';

        showToast({ type: 'error', message: toastMessage });
      }
    },
  });

  const transationSelectData = ['EXPENSE', 'INCOME'].map((item) => ({
    label: transationTypeEnumTranslate(item),
    value: item,
  }));

  const getCategoriesByType = (type: 'EXPENSE' | 'INCOME'): void => {
    const formattedType = type.toLowerCase();

    getData(`/categories/${formattedType}`, (snapshot) => {
      if (snapshot.exists()) {
        const data: Category[] = Object.values(snapshot.val());

        const activeCategories = data.filter(
          (category) => category.active === true,
        );

        const newCategorySelectData = activeCategories.map((category) => ({
          label: capitalizeFirstLetterOfEachWorlds(category.name),
          value: category.id,
        }));

        setCategorySelectData(newCategorySelectData);
      }
    });
  };

  const getAccounts = (): void => {
    getData(`/accounts`, (snapshot) => {
      if (snapshot.exists()) {
        const data: Account[] = Object.values(snapshot.val());

        const activeAccounts = data.filter(
          (account) => account.active === true,
        );

        const accountSelectData = activeAccounts.map((account: any) => ({
          label: capitalizeFirstLetterOfEachWorlds(account.name),
          value: account.id,
        }));

        setAccounts(snapshot.val());
        setAccountSelectData(accountSelectData);
      }
    });
  };

  const fillTransationFormik = (id: string): void => {
    if (!transationDate) return;

    const urlFormattedDate = formatDateWithDateFns(transationDate, 'MM-yyyy');

    getData(`/transations/${urlFormattedDate}/${id}`, (snapshot) => {
      if (snapshot.exists()) {
        const transationData = snapshot.val();

        console.log(transationData);

        formik.setValues({
          id: transationData.id,
          date: new Date(transationData.date),
          type: transationData.type,
          categoryId: transationData.categoryId,
          description: transationData.description || '-',
          accountId: transationData.accountId,
          value: Number(transationData.value),
        });
      }
    });
  };

  useEffect(() => {
    getCategoriesByType(formik.values.type);
  }, [formik.values.type]);

  useEffect(() => {
    if (!accounts) return;

    setSellectedAccount(accounts[formik.values.accountId]);
  }, [formik.values.accountId]);

  useEffect(() => {
    getCategoriesByType(formik.values.type);
    getAccounts();

    if (modalType === 'update') {
      fillTransationFormik(id);
    }
  }, []);

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.Title id="modal-title">
        {modalType === 'create' ? 'Nova transação' : 'Editar transação'}
      </S.Title>

      <S.Label htmlFor="value">Valor</S.Label>
      <Input
        id="value"
        type="number"
        placeholder="R$ 0.00"
        value={formik.values.value}
        onChange={(value) => formik.setFieldValue('value', value)}
        style={{
          padding: '.5em',
        }}
        required
      />

      <S.Label htmlFor="date">Data</S.Label>
      <DatePicker
        id="date"
        format="yyyy-MM-dd"
        value={formik.values.date}
        onChange={(value) => formik.setFieldValue('date', value)}
        cleanable={false}
      />

      <S.Label htmlFor="type">Tipo</S.Label>
      <SelectPicker
        id="type"
        data={transationSelectData}
        value={formik.values.type}
        onChange={(value) => formik.setFieldValue('type', value)}
        searchable={false}
        cleanable={false}
      />

      <S.Label htmlFor="categoryId">Categoria</S.Label>
      <SelectPicker
        id="categoryId"
        data={categorySelectData}
        value={formik.values.categoryId}
        onChange={(value) => formik.setFieldValue('categoryId', value)}
        searchable={false}
        cleanable={false}
      />

      <S.Label htmlFor="description">Descrição</S.Label>
      <Input
        id="description"
        type="description"
        value={formik.values.description}
        onChange={(value) => formik.setFieldValue('description', value)}
      />

      <S.Label htmlFor="accountId">Conta</S.Label>
      <SelectPicker
        id="accountId"
        data={accountSelectData}
        value={formik.values.accountId}
        onChange={(value) => formik.setFieldValue('accountId', value)}
        searchable={false}
        cleanable={false}
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

export default TransationModal;
