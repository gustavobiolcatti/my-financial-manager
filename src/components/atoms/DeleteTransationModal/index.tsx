import { useEffect, useState } from 'react';

import useDeleteData from 'requests/mutations/useDeleteData';
import useSetData from 'requests/mutations/useSetData';
import useGetData from 'requests/queries/useGetData';

import { useToast } from 'hooks/useToast';

import { Transation } from 'models/transation';
import { Account } from 'models/account';

import Button from 'components/atoms/Button';

import { formatDateWithDateFns } from 'utils/formatDate';

import * as S from './styles';

type DeleteTransationModalProps = {
  transation: Transation;
  closeModal: () => void;
};

const DeleteTransationModal = ({
  transation,
  closeModal,
}: DeleteTransationModalProps): JSX.Element => {
  const [account, setAccount] = useState<Account>();

  const { deleteData } = useDeleteData();
  const { setData } = useSetData();
  const { getData } = useGetData();
  const { showToast } = useToast();

  const handleDeleteData = (
    transation: Transation,
    account?: Account,
  ): void => {
    try {
      if (!transation || !account) return;

      const urlFormattedDate = formatDateWithDateFns(
        transation.date,
        'MM-yyyy',
      );

      const accountBalance = Number(account.balance);
      const transationValue = Number(transation.value);

      const newBalance: number =
        transation.type === 'EXPENSE'
          ? accountBalance + transationValue
          : accountBalance - transationValue;

      setData(`/accounts/${account.id}`, { ...account, balance: newBalance });

      deleteData(`/transations/${urlFormattedDate}/${transation.id}`);

      showToast({ type: 'success', message: 'Categoria excluída' });
      closeModal();
    } catch (error) {
      const err = error as Error;

      console.log('ERROR => ', err.message);
      showToast({ type: 'error', message: 'Erro ao realizar exclusão' });
    }
  };

  const getAccountById = (id: string): void => {
    getData(`/accounts/${id}`, (snapshot) => {
      if (snapshot.exists()) setAccount(snapshot.val());
    });
  };

  useEffect(() => {
    getAccountById(transation.accountId);
  }, []);

  return (
    <>
      <S.Title id="modal-title">
        Deseja mesmo mesmo excluir a transação?
      </S.Title>
      <S.ButtonContainer>
        <Button onClick={() => handleDeleteData(transation, account)} alert>
          Sim
        </Button>
        <Button onClick={closeModal}>Não</Button>
      </S.ButtonContainer>
    </>
  );
};

export default DeleteTransationModal;
