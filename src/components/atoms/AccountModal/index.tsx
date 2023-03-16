import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Input, SelectPicker } from 'rsuite';

import useGetData from 'requests/queries/useGetData';
import useSetData from 'requests/mutations/useSetData';

import { useToast } from 'hooks/useToast';

import { accountTypeEnumTranslate } from 'models/enums/account-type-enum';
import { Account } from 'models/account';

import Button from 'components/atoms/Button';

import * as S from './styles';

type AccountModalProps = {
  id: string;
  modalType: 'create' | 'update';
  closeModal: () => void;
};

const AccountModal = ({
  id,
  modalType,
  closeModal,
}: AccountModalProps): JSX.Element => {
  const { showToast } = useToast();
  const { getData } = useGetData();
  const { setData } = useSetData();

  const formik = useFormik<Account>({
    initialValues: {
      id,
      name: '',
      type: 'WALLET',
      balance: '',
    },
    onSubmit: (values) => {
      try {
        const data = {
          id: values.id,
          name: values.name,
          type: values.type,
          balance: Number(values.balance),
        };

        setData(`/accounts/${values.id}`, data);

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

  const accountSelectData = ['WALLET', 'BANK', 'EXCHANGE'].map((item) => ({
    label: accountTypeEnumTranslate(item),
    value: item,
  }));

  useEffect(() => {
    if (modalType === 'create') return;

    getData(`/accounts/${id}`, (snapshot) => {
      if (snapshot.exists()) {
        const accountData = snapshot.val();

        formik.setValues({
          id: accountData.id,
          name: accountData.name,
          type: accountData.type,
          balance: accountData.balance,
        });
      }
    });
  }, []);

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.Title id="modal-title">
        {modalType === 'create' ? 'Nova conta' : 'Editar conta'}
      </S.Title>

      <S.Label htmlFor="name">Nome da conta</S.Label>
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

      <S.Label htmlFor="type">Tipo da conta</S.Label>
      <SelectPicker
        id="type"
        data={accountSelectData}
        value={formik.values.type}
        onChange={(value) => formik.setFieldValue('type', value)}
        searchable={false}
        cleanable={false}
      />

      <S.Label htmlFor="balance">Saldo inicial</S.Label>
      <Input
        id="balance"
        type="number"
        placeholder="R$ 0.00"
        value={formik.values.balance}
        onChange={(value) => formik.setFieldValue('balance', value)}
        required
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

export default AccountModal;
