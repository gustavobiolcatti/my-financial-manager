import { useState } from 'react';

import { Account } from 'models/account';
import { accountTypeEnumTranslate } from 'models/enums/account-type-enum';

import ShowModal from 'components/molecules/Modal';
import Card from 'components/molecules/Card';
import DeleteAccountModal from 'components/atoms/DeleteAccountModal';
import AccountModal from 'components/atoms/AccountModal';
import ActionButton from 'components/atoms/ActionButton';

import * as S from './styles';

type AccountsWrapperProps = {
  accounts: Account[];
};
const AccountsWrapper = ({ accounts }: AccountsWrapperProps): JSX.Element => {
  const [accountId, setAccountId] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (id: string, type: string) => {
    setModalType(type);
    setAccountId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <S.Container>
      {accounts.map((account) => (
        <Card
          title={account.name}
          description={accountTypeEnumTranslate(account.type) || ''}
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
    </S.Container>
  );
};

export default AccountsWrapper;
