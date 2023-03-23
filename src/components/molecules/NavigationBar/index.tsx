import { useState } from 'react';
import { RiBankLine, RiPieChartLine, RiFileList3Line } from 'react-icons/ri';
import { MdOutlineExitToApp, MdMenuOpen, MdMenu } from 'react-icons/md';
import { TbTag } from 'react-icons/tb';

import { useMenu } from 'contexts/MenuContext';

import ExitModal from 'components/atoms/ExitModal';
import NavItem from 'components/atoms/NavItem';
import ShowModal from 'components/molecules/Modal';

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

        <NavItem
          id="dashboard"
          to="/dashboard"
          type="link"
          click={() => handleChangeSellectedPage('dashboard')}
          className="nav-link sellected-page"
        >
          <RiPieChartLine size={24} />
          <span>Dashboard</span>
        </NavItem>

        <NavItem
          id="accounts"
          to="/accounts"
          type="link"
          click={() => handleChangeSellectedPage('accounts')}
          className="nav-link"
        >
          <RiBankLine size={24} />
          <span>Contas</span>
        </NavItem>

        <NavItem
          id="transations"
          to="/transations"
          type="link"
          click={() => handleChangeSellectedPage('transations')}
          className="nav-link"
        >
          <RiFileList3Line size={24} />
          <span>Transações</span>
        </NavItem>

        <NavItem
          id="categories"
          to="/categories"
          type="link"
          click={() => handleChangeSellectedPage('categories')}
          className="nav-link"
        >
          <TbTag size={24} />
          <span>Categorias</span>
        </NavItem>

        <NavItem to="" type="button" click={() => setOpenModal(true)}>
          <MdOutlineExitToApp size={24} />
          Sair
        </NavItem>
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
