import { useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { useFormik } from 'formik';
import { Input, SelectPicker } from 'rsuite';

import { useAuth } from 'contexts/AuthContext';

import { db } from 'services/firebase';

import useGetData from 'requests/queries/useGetData';

import { useToast } from 'hooks/useToast';

import { accountTypeEnumTranslate } from 'models/enums/account-type-enum';
import { Account } from 'models/account';

import Button from 'components/atoms/Button';

import colors from 'assets/colors';

import * as S from './styles';

type AccountModalProps = {
  id: string;
  modalType: string;
  closeModal: () => void;
};

const AccountModal = ({
  id,
  modalType,
  closeModal,
}: AccountModalProps): JSX.Element => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { getData } = useGetData();

  const formik = useFormik<Account>({
    initialValues: {
      id,
      name: '',
      type: 'WALLET',
      balance: 0,
    },
    onSubmit: (values) => {
      try {
        const docRef = ref(db, `users/${user?.id}/accounts/${values.id}`);

        const formattedBalance = parseFloat(values.balance.toString()).toFixed(
          2,
        );

        set(docRef, {
          id: values.id,
          name: values.name,
          type: values.type,
          balance: formattedBalance,
        });

        const toastMessage =
          modalType === 'new-account'
            ? 'Conta criada com sucesso'
            : 'Conta atualizada';

        showToast({ type: 'success', message: toastMessage });
        closeModal();
      } catch (error) {
        const err = error as Error;
        console.log('ERROR => ', err.message);

        const toastMessage =
          modalType === 'new-account'
            ? 'Erro ao criar conta'
            : 'Erro ao atualizar conta';

        showToast({ type: 'error', message: toastMessage });
      }
    },
  });

  const selectData = ['WALLET', 'BANK', 'EXCHANGE'].map((item) => ({
    label: accountTypeEnumTranslate(item),
    value: item,
  }));

  useEffect(() => {
    if (modalType === 'new-account') return;

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
        {modalType === 'new-account' ? 'Nova conta' : 'Editar conta'}
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
        data={selectData}
        value={formik.values.type}
        onChange={(value) => formik.setFieldValue('type', value)}
        searchable={false}
        style={{ color: colors.purple }}
        menuStyle={{ zIndex: 1300, color: colors.purple }}
      />

      <S.Label htmlFor="balance">Saldo inicial</S.Label>
      <Input
        id="balance"
        type="number"
        value={formik.values.balance}
        onChange={(value) => formik.setFieldValue('balance', value)}
        required
      />

      <S.ButtonContainer>
        <Button type="submit" alert>
          {modalType === 'new-account' ? 'Criar' : 'Atualizar'}
        </Button>
        <Button onClick={closeModal}>Cancelar</Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default AccountModal;
