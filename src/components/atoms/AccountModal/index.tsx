import { useEffect } from 'react';
import { useFormik } from 'formik';
import { uuidv4 } from '@firebase/util';
import { Input, SelectPicker } from 'rsuite';

import useSetData from 'requests/mutations/useSetData';

import { useToast } from 'hooks/useToast';

import { accountTypeEnumTranslate } from 'models/enums/account-type-enum';
import { Account } from 'models/account';

import Button from 'components/atoms/Button';
import FormLabel from 'components/atoms/FormLabel';
import Form from 'components/molecules/Form';
import InputGroup from 'components/molecules/InputGroup';
import ButtonWrapper from 'components/molecules/ButtonWrapper';

type AccountModalProps = {
  account?: Account;
  modalType: 'create' | 'update';
  closeModal: () => void;
};

const AccountModal = ({
  account,
  modalType,
  closeModal,
}: AccountModalProps): JSX.Element => {
  const { showToast } = useToast();
  const { setData } = useSetData();

  const formik = useFormik<Account>({
    initialValues: {
      id: uuidv4(),
      name: '',
      type: 'WALLET',
      balance: '',
      active: true,
    },
    onSubmit: (values) => {
      try {
        const data = {
          id: values.id,
          name: values.name,
          type: values.type,
          balance: Number(values.balance),
          active: Boolean(true),
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

  const fillAccountFormik = (): void => {
    if (!account) return;

    formik.setValues({
      id: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance,
      active: Boolean(account.active),
    });
  };

  useEffect(() => {
    if (modalType === 'update') {
      fillAccountFormik();
    }
  }, []);

  return (
    <Form
      title={modalType === 'create' ? 'Nova conta' : 'Editar conta'}
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

      <InputGroup singleColumn>
        <FormLabel htmlFor="type">Tipo</FormLabel>
        <SelectPicker
          id="type"
          data={accountSelectData}
          value={formik.values.type}
          onChange={(value) => formik.setFieldValue('type', value)}
          searchable={false}
          cleanable={false}
        />
      </InputGroup>

      <InputGroup singleColumn>
        <FormLabel htmlFor="balance">
          Saldo {modalType !== 'update' && 'inicial'}
        </FormLabel>
        <Input
          id="balance"
          type="number"
          placeholder="R$ 0.00"
          value={formik.values.balance}
          onChange={(value) => formik.setFieldValue('balance', value)}
          required
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

export default AccountModal;
