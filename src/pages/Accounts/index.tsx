import { useEffect, useState } from 'react';
import { uuidv4 } from '@firebase/util';

import useGetData from 'requests/queries/useGetData';

import { accountType } from 'models/enums/account-type';
import { Account } from 'models/account';

import ShowModal from 'components/molecules/Modal';
import DeleteAccountModal from 'components/atoms/DeleteAccountModal';
import AccountModal from 'components/atoms/AccountModal';
import ActionButton from 'components/atoms/ActionButton';

import * as S from './styles';

const Accounts = (): JSX.Element => {
  const [accounts, setAccounts] = useState<Account[]>();
  const [accountId, setAccountId] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { getData } = useGetData();

  const handleOpenModal = (id: string, type: string) => {
    setModalType(type);
    setAccountId(id);
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
            <S.AddButton
              onClick={() => handleOpenModal(uuidv4(), 'new-account')}
            >
              +
            </S.AddButton>
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
                  <S.ActionButtonWrapper>
                    <ActionButton
                      actionType="update"
                      onClick={() =>
                        handleOpenModal(account.id, 'update-account')
                      }
                    />
                    <ActionButton
                      actionType="delete"
                      onClick={() =>
                        handleOpenModal(account.id, 'delete-account')
                      }
                    />
                  </S.ActionButtonWrapper>
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
      {openModal && (
        <ShowModal showModal={openModal} closeModal={handleCloseModal}>
          {modalType !== 'delete-account' ? (
            <AccountModal
              type={modalType}
              id={accountId}
              closeModal={handleCloseModal}
            />
          ) : (
            <DeleteAccountModal id={accountId} closeModal={handleCloseModal} />
          )}
        </ShowModal>
      )}
    </>
  );
};

export default Accounts;
