import { useEffect, useState } from 'react';
import { uuidv4 } from '@firebase/util';

import useGetData from 'requests/queries/useGetData';

import { Account } from 'models/account';
import { accountTypeEnum } from 'models/enums/account-type-enum';

import TitleContainer from 'components/molecules/TitleContainer';
import ShowModal from 'components/molecules/Modal';
import Card from 'components/molecules/Card';
import DeleteAccountModal from 'components/atoms/DeleteAccountModal';
import AccountModal from 'components/atoms/AccountModal';
import ActionButton from 'components/atoms/ActionButton';
import AddButton from 'components/atoms/AddButton';

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
      <TitleContainer title="contas">
        <AddButton onClick={() => handleOpenModal(uuidv4(), 'new-account')} />
      </TitleContainer>
      <S.Container>
        <S.Accounts>
          {accounts &&
            accounts.map((account) => (
              <Card
                title={account.name}
                description={accountTypeEnum[account.type]}
                balance={account.balance}
                key={account.id}
              >
                <ActionButton
                  actionType="update"
                  onClick={() => handleOpenModal(account.id, 'update-account')}
                />
                <ActionButton
                  actionType="delete"
                  onClick={() => handleOpenModal(account.id, 'delete-account')}
                />
              </Card>
            ))}
        </S.Accounts>
        <S.Charts>Gráficos</S.Charts>
      </S.Container>

      {openModal && (
        <ShowModal showModal={openModal} closeModal={handleCloseModal}>
          {modalType !== 'delete-account' ? (
            <AccountModal
              modalType={modalType}
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
