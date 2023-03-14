import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiBankLine, RiPieChartLine, RiFileList3Line } from 'react-icons/ri';
import { MdOutlineExitToApp } from 'react-icons/md';

import ShowModal from 'components/molecules/Modal';
import ExitModal from 'components/atoms/ExitModal';

import * as S from './styles';

const NavigationBar = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangeSellectedPage = (currentPage: string) => {
    const allPagesElement = document.querySelectorAll('.nav-link');

    allPagesElement.forEach((page) => {
      page.classList.remove('sellected-page');
    });

    const currentPageElement = document.getElementById(currentPage);
    currentPageElement?.classList.add('sellected-page');
  };

  return (
    <S.Container>
      <Link
        to="/dashboard"
        id="dashboard"
        className="nav-link sellected-page"
        onClick={() => handleChangeSellectedPage('dashboard')}
      >
        <S.LinkText>
          <RiPieChartLine size={24} />
          <span>Dashboard</span>
        </S.LinkText>
      </Link>
      <Link
        to="/accounts"
        id="accounts"
        className="nav-link"
        onClick={() => handleChangeSellectedPage('accounts')}
      >
        <S.LinkText>
          <RiBankLine size={24} />
          <span>Contas</span>
        </S.LinkText>
      </Link>
      <Link
        to="/transations"
        id="transations"
        className="nav-link"
        onClick={() => handleChangeSellectedPage('transations')}
      >
        <S.LinkText>
          <RiFileList3Line size={24} />
          <span>Transações</span>
        </S.LinkText>
      </Link>

      <S.Button onClick={handleOpenModal}>
        <S.LinkText>
          <MdOutlineExitToApp size={24} />
          Sair
        </S.LinkText>
      </S.Button>

      {openModal && (
        <ShowModal showModal={openModal} closeModal={handleCloseModal}>
          <ExitModal closeModal={handleCloseModal} />
        </ShowModal>
      )}
    </S.Container>
  );
};

export default NavigationBar;
