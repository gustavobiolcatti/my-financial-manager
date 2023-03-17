import useSetData from 'requests/mutations/useSetData';

import { useToast } from 'hooks/useToast';

import Button from 'components/atoms/Button';

import { Account } from 'models/account';

import * as S from './styles';

type DeleteAccountModalProps = {
  account: Account;
  closeModal: () => void;
};

const DeleteAccountModal = ({
  account,
  closeModal,
}: DeleteAccountModalProps): JSX.Element => {
  const { setData } = useSetData();
  const { showToast } = useToast();

  const handleDeleteData = (): void => {
    try {
      setData(`/accounts/${account.id}`, { ...account, active: false });

      closeModal();

      showToast({ type: 'success', message: 'Conta excluída' });
    } catch (error) {
      const err = error as Error;

      console.log('ERROR => ', err.message);
      showToast({ type: 'error', message: 'Erro ao realizar exclusão' });
    }
  };

  return (
    <>
      <S.Title id="modal-title">Deseja mesmo mesmo excluir a conta?</S.Title>
      <S.ButtonContainer>
        <Button onClick={handleDeleteData} alert>
          Sim
        </Button>
        <Button onClick={closeModal}>Não</Button>
      </S.ButtonContainer>
    </>
  );
};

export default DeleteAccountModal;
