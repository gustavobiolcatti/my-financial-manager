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
  const [account, setAccount] = useState<Account>();

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (account: Account, type: 'delete' | 'update') => {
    setModalType(type);
    setAccount(account);
    setOpenModal(true);
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
            onClick={() => handleOpenModal(account, 'update')}
          />
          <ActionButton
            actionType="delete"
            onClick={() => handleOpenModal(account, 'delete')}
          />
        </Card>
      ))}
      {openModal && (
        <ShowModal showModal={openModal} closeModal={() => setOpenModal(false)}>
          {modalType === 'update' && account ? (
            <AccountModal
              account={account}
              modalType="update"
              closeModal={() => setOpenModal(false)}
            />
          ) : (
            account && (
              <DeleteAccountModal
                account={account}
                closeModal={() => setOpenModal(false)}
              />
            )
          )}
        </ShowModal>
      )}
    </S.Container>
  );
};

export default AccountsWrapper;
