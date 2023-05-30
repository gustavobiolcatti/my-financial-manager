import styled, { css } from 'styled-components';
import { DonutChart } from '@styled-icons/remix-fill/DonutChart';
import { Bank } from '@styled-icons/remix-line/Bank';
import { FileList3 } from '@styled-icons/remix-line/FileList3';
import { Tag } from '@styled-icons/octicons/Tag';
import { Exit } from '@styled-icons/boxicons-regular/Exit';
import { MenuOpen } from '@styled-icons/material-rounded/MenuOpen';
import { Menu } from '@styled-icons/material-rounded/Menu';

import colors from 'assets/colors';

import { ContainerProps } from './types';

export const Container = styled.nav<ContainerProps>`
  ${({ active }) => css`
    position: fixed;

    width: 250px;
    height: 100%;

    left: 0;

    padding: 1em 0;

    background: ${colors.black};

    box-shadow: 0 0 30px 5px ${colors.gray};

    transition: 0.2s;

    z-index: 1600;

    @media (max-width: 1024px) {
      left: ${!active ? '-250px' : 0};
    }
  `}
`;

export const LinksWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  gap: 1em;

  height: 100%;

  .sellected-page {
    padding-right: 0;

    span {
      color: ${colors.purple};
    }

    ::after {
      margin-left: 1em;

      border-radius: 10px 0 0 10px;
      border-left: 5px solid ${colors.purple};
    }
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  padding: 1em 2em;
  margin-bottom: 2em;

  img {
    width: 20%;
  }
`;

export const LogoName = styled.span`
  margin-left: 1em;

  color: ${colors.white};
  font-weight: 700;
`;

export const ToggleButton = styled.button`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  top: 15px;
  right: -55px;

  padding: 0.2em;

  border-radius: 10px;

  background: ${colors.white};

  color: ${colors.gray};

  box-shadow: 0 0 10px ${colors.gray};

  transition: 0.2s;

  :hover {
    transform: scale(0.95);
  }

  @media (min-width: 1440px) {
    display: none;
  }
`;

export const ChartIcon = styled(DonutChart)``;

export const BankIcon = styled(Bank)``;

export const RecipeIcon = styled(FileList3)``;

export const TagIcon = styled(Tag)``;

export const ExitIcon = styled(Exit)``;

export const MenuOpenIcon = styled(MenuOpen)`
  color: ${colors.gray};
`;

export const MenuIcon = styled(Menu)`
  color: ${colors.gray};
`;
