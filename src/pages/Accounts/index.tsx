import { useEffect, useState } from 'react';

import useGetData from 'requests/queries/useGetData';

import { Account } from 'models/account';

import TitleContainer from 'components/molecules/TitleContainer';
import ShowModal from 'components/molecules/Modal';
import AccountsWrapper from 'components/molecules/AccountsWrapper';
import EmptyBox from 'components/atoms/EmptyBox';
import AddButton from 'components/atoms/AddButton';
import AccountModal from 'components/atoms/AccountModal';

import * as S from './styles';

const Accounts = (): JSX.Element => {
  const [accounts, setAccounts] = useState<Account[]>();
  const [openModal, setOpenModal] = useState(false);

  const { getData } = useGetData();

  const getAccounts = (): void => {
    getData(`/accounts`, (snapshot) => {
      const data: Account[] = Object.values(snapshot.val());

      const activeAccounts = data.filter((account) => account.active === true);

      setAccounts(activeAccounts);
    });
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <TitleContainer title="contas">
        <AddButton onClick={() => setOpenModal(true)} />
      </TitleContainer>

      <S.Container>
        {accounts ? <AccountsWrapper accounts={accounts} /> : <EmptyBox />}
        <S.Charts>Gráficos</S.Charts>
      </S.Container>

      {openModal && (
        <ShowModal showModal={openModal} closeModal={() => setOpenModal(false)}>
          <AccountModal
            modalType="create"
            closeModal={() => setOpenModal(false)}
          />
        </ShowModal>
      )}
    </>
  );
};

export default Accounts;
