import { useEffect, useState } from 'react';

import useGetData from 'requests/queries/useGetData';

import useModal from 'hooks/useModal';

import { Account } from 'models/account';
import { accountType } from 'models/enums/account-type';

import * as S from './styles';

const Accounts = (): JSX.Element => {
  const [accounts, setAccounts] = useState<Account[]>();
  const [openModal, setOpenModal] = useState(false);

  const { getData } = useGetData();
  const { showModal } = useModal();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getAccounts = (): void => {
    getData(`/accounts`, (snapshot) => {
      const data = snapshot.val();

      setAccounts(Object.values(data));
    });
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <h1>Contas</h1>
      <S.Container>
        <S.Accounts>
          <S.Card newCard>
            <S.AddButton onClick={handleOpenModal}>+</S.AddButton>
          </S.Card>
          {accounts &&
            accounts.map((account) => (
              <S.Card key={account.id}>
                <S.CardHeader>
                  <div>
                    <S.CardTitle>{account.name}</S.CardTitle>
                    <S.CardDescription>
                      {accountType[account.type]}
                    </S.CardDescription>
                  </div>
                  <S.Button />
                </S.CardHeader>
                <S.CardBalance
                  negative={account.balance < 0}
                  positive={account.balance > 0}
                >
                  R$ {account.balance}
                </S.CardBalance>
              </S.Card>
            ))}
        </S.Accounts>
        <S.Charts>Gráficos</S.Charts>
      </S.Container>
      {openModal &&
        showModal({
          type: 'new-account',
          showModal: openModal,
          closeModal: handleCloseModal,
        })}
    </>
  );
};

export default Accounts;
