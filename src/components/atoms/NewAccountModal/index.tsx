import { useFormik } from 'formik';
import { ref, set } from 'firebase/database';
import { uuidv4 } from '@firebase/util';

import { useAuth } from 'contexts/AuthContext';

import { db } from 'services/firebase';

import usePostAccount from 'requests/mutations/usePostAccount';

import { Account } from 'models/account';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Select from 'components/atoms/Select';

import * as S from './styles';
import { useToast } from '../../../hooks/useToast';

type NewAccountModalProps = {
  closeModal: () => void;
};

const NewAccountModal = ({ closeModal }: NewAccountModalProps): JSX.Element => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const formik = useFormik<Account>({
    initialValues: {
      id: uuidv4(),
      name: '',
      type: 'wallet',
      balance: 0,
    },
    onSubmit: (values) => {
      try {
        const docRef = ref(db, `users/${user?.id}/accounts/${values.id}`);

        set(docRef, {
          id: values.id,
          name: values.name,
          type: values.type,
          balance: values.balance,
        });

        showToast({ type: 'success', message: 'Conta criada com sucesso' });
        closeModal();
      } catch (error) {
        const err = error as Error;
        console.log('ERROR => ', err.message);

        showToast({ type: 'error', message: 'Erro ao criar conta' });
      }
    },
  });

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      <S.Title id="modal-title">Nova conta</S.Title>

      <S.Label htmlFor="name">Nome da conta</S.Label>
      <Input
        id="name"
        description="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        required
      />

      <S.Label htmlFor="type">Tipo da conta</S.Label>
      <Select
        id="type"
        description="type"
        value={formik.values.type}
        onChange={formik.handleChange}
      >
        <option value="wallet" label="Carteira" />
        <option value="bank" label="Banco" />
        <option value="exchange" label="Corretora" />
      </Select>

      <S.Label htmlFor="balance">Saldo inicial</S.Label>
      <Input
        id="balance"
        description="balance"
        type="number"
        value={formik.values.balance}
        onChange={formik.handleChange}
        required
      />

      <S.ButtonContainer>
        <Button type="submit" alert>
          Criar
        </Button>
        <Button onClick={closeModal}>Cancelar</Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default NewAccountModal;
