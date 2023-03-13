import { useState } from 'react';

import useModal from 'hooks/useModal';

import * as S from './styles';

const Accounts = (): JSX.Element => {
  const [openModal, setOpenModal] = useState(false);

  const { showModal } = useModal();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <S.Container>
      <h1>Contas</h1>
      <h5>Charts</h5>
      <S.Wrapper>
        <S.Card newCard>
          <S.AddButton onClick={handleOpenModal}>+</S.AddButton>
        </S.Card>
      </S.Wrapper>
      {openModal &&
        showModal({
          type: 'new-account',
          showModal: openModal,
          closeModal: handleCloseModal,
        })}
    </S.Container>
  );
};

export default Accounts;
