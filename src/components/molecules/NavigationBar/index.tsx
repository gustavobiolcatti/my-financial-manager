import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiBankLine, RiPieChartLine, RiFileList3Line } from 'react-icons/ri';
import { MdOutlineExitToApp, MdMenuOpen, MdMenu } from 'react-icons/md';
import { TbTag } from 'react-icons/tb';

import { useMenu } from 'contexts/MenuContext';

import ShowModal from 'components/molecules/Modal';
import ExitModal from 'components/atoms/ExitModal';

import Logo from 'assets/img/logo.svg';

import * as S from './styles';

const NavigationBar = () => {
  const [openModal, setOpenModal] = useState(false);

  const { menuActive, toggleMenu } = useMenu();

  const handleChangeSellectedPage = (currentPage: string) => {
    const allPagesElement = document.querySelectorAll('.nav-link');

    allPagesElement.forEach((page) => {
      page.classList.remove('sellected-page');
    });

    const currentPageElement = document.getElementById(currentPage);
    currentPageElement?.classList.add('sellected-page');
  };

  return (
    <S.Container active={menuActive}>
      <S.ToggleButton onClick={toggleMenu}>
        {menuActive ? <MdMenuOpen size={32} /> : <MdMenu size={32} />}
      </S.ToggleButton>

      <S.LinksWrapper onClick={toggleMenu}>
        <li>
          <S.LogoWrapper>
            <img src={Logo} alt="" />
            <S.LogoName>my financial manager</S.LogoName>
          </S.LogoWrapper>
        </li>

        <S.NavItem id="dashboard" className="nav-link sellected-page">
          <Link
            to="/dashboard"
            onClick={() => handleChangeSellectedPage('dashboard')}
          >
            <S.LinkText>
              <RiPieChartLine size={24} />
              <span>Dashboard</span>
            </S.LinkText>
          </Link>
        </S.NavItem>

        <S.NavItem id="accounts" className="nav-link">
          <Link
            to="/accounts"
            onClick={() => handleChangeSellectedPage('accounts')}
          >
            <S.LinkText>
              <RiBankLine size={24} />
              <span>Contas</span>
            </S.LinkText>
          </Link>
        </S.NavItem>

        <S.NavItem id="transations" className="nav-link">
          <Link
            to="/transations"
            onClick={() => handleChangeSellectedPage('transations')}
          >
            <S.LinkText>
              <RiFileList3Line size={24} />
              <span>Transações</span>
            </S.LinkText>
          </Link>
        </S.NavItem>

        <S.NavItem id="categories" className="nav-link">
          <Link
            to="/categories"
            onClick={() => handleChangeSellectedPage('categories')}
          >
            <S.LinkText>
              <TbTag size={24} />
              <span>Categorias</span>
            </S.LinkText>
          </Link>
        </S.NavItem>

        <S.NavItem>
          <S.Button onClick={() => setOpenModal(true)}>
            <S.LinkText>
              <MdOutlineExitToApp size={24} />
              Sair
            </S.LinkText>
          </S.Button>
        </S.NavItem>
      </S.LinksWrapper>

      {openModal && (
        <ShowModal showModal={openModal} closeModal={() => setOpenModal(false)}>
          <ExitModal closeModal={() => setOpenModal(false)} />
        </ShowModal>
      )}
    </S.Container>
  );
};

export default NavigationBar;
