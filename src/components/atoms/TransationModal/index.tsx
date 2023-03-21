import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { uuidv4 } from '@firebase/util';
import { DatePicker, Input, SelectPicker } from 'rsuite';

import useGetData from 'requests/queries/useGetData';
import useSetData from 'requests/mutations/useSetData';
import useDeleteData from 'requests/mutations/useDeleteData';

import { useToast } from 'hooks/useToast';

import { Account } from 'models/account';
import { Transation } from 'models/transation';
import { transationTypeEnumTranslate } from 'models/enums/transation-type-enum';
import { Category } from 'models/category';

import Button from 'components/atoms/Button';
import FormLabel from 'components/atoms/FormLabel';
import Form from 'components/molecules/Form';
import InputGroup from 'components/molecules/InputGroup';
import ButtonWrapper from 'components/molecules/ButtonWrapper';

import { capitalizeFirstLetterOfEachWorlds } from 'utils/capitalizeFirstLetterOfEachWorlds';
import { formatDateWithDateFns } from 'utils/formatDate';

type TransationModalProps = {
  transation?: Transation;
  modalType: 'create' | 'update';
  closeModal: () => void;
};

const TransationModal = ({
  transation,
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
  const { deleteData } = useDeleteData();

  const formik = useFormik<Transation>({
    initialValues: {
      id: uuidv4(),
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

        const newAccountBalance = Number(sellectedAccount.balance);
        const newTransationValue = Number(values.value);

        const data = {
          id: values.id,
          date: new Date(values.date).toISOString(),
          type: values.type,
          categoryId: values.categoryId,
          description: values.description,
          accountId: values.accountId,
          value: newTransationValue,
        };

        let newBalance = 0;

        if (modalType === 'update') {
          if (!transation || !accounts) return;

          const account: Account = accounts[transation.accountId];

          const urlFormattedOldDate = formatDateWithDateFns(
            transation.date,
            'MM-yyyy',
          );

          const oldAccountBalance = Number(account.balance);
          const oldTransationValue = Number(transation.value);

          const newTransationValue = Number(formik.values.value);

          newBalance =
            transation.type === 'EXPENSE'
              ? oldAccountBalance + oldTransationValue
              : oldAccountBalance - oldTransationValue;

          newBalance =
            formik.values.type === 'EXPENSE'
              ? newBalance - newTransationValue
              : newBalance + newTransationValue;

          deleteData(`/transations/${urlFormattedOldDate}/${transation.id}`);
        } else {
          newBalance =
            values.type === 'EXPENSE'
              ? newAccountBalance - newTransationValue
              : newAccountBalance + newTransationValue;
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

  const fillTransationFormik = (transation?: Transation): void => {
    if (!transation) return;

    formik.setValues({
      id: transation.id,
      date: new Date(transation.date),
      type: transation.type,
      categoryId: transation.categoryId,
      description: transation.description || '-',
      accountId: transation.accountId,
      value: Number(transation.value),
    });
  };

  const transationSelectData = ['EXPENSE', 'INCOME'].map((item) => ({
    label: transationTypeEnumTranslate(item),
    value: item,
  }));

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
      fillTransationFormik(transation);
    }
  }, []);

  return (
    <Form
      title={modalType === 'create' ? 'Nova transação' : 'Editar transação'}
      onSubmit={formik.handleSubmit}
    >
      <InputGroup>
        <FormLabel htmlFor="value">Valor</FormLabel>
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
      </InputGroup>

      <InputGroup>
        <FormLabel htmlFor="description">Descrição</FormLabel>
        <Input
          id="description"
          type="description"
          value={formik.values.description}
          onChange={(value) => formik.setFieldValue('description', value)}
        />
      </InputGroup>

      <InputGroup singleColumn>
        <FormLabel htmlFor="date">Data</FormLabel>
        <DatePicker
          id="date"
          format="yyyy-MM-dd"
          value={formik.values.date}
          onChange={(value) => formik.setFieldValue('date', value)}
          cleanable={false}
        />
      </InputGroup>

      <InputGroup singleColumn>
        <FormLabel htmlFor="accountId">Conta</FormLabel>
        <SelectPicker
          id="accountId"
          data={accountSelectData}
          value={formik.values.accountId}
          onChange={(value) => formik.setFieldValue('accountId', value)}
          searchable={false}
          cleanable={false}
        />
      </InputGroup>

      <InputGroup singleColumn>
        <FormLabel htmlFor="type">Tipo</FormLabel>
        <SelectPicker
          id="type"
          data={transationSelectData}
          value={formik.values.type}
          onChange={(value) => formik.setFieldValue('type', value)}
          searchable={false}
          cleanable={false}
        />
      </InputGroup>

      <InputGroup singleColumn>
        <FormLabel htmlFor="categoryId">Categoria</FormLabel>
        <SelectPicker
          id="categoryId"
          data={categorySelectData}
          value={formik.values.categoryId}
          onChange={(value) => formik.setFieldValue('categoryId', value)}
          searchable={false}
          cleanable={false}
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

export default TransationModal;
