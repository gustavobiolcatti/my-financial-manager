import styled, { css } from 'styled-components';

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

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 0 1em;

  transition: 0.2s;

  a,
  button {
    width: 100%;
  }

  :last-child {
    margin-top: auto;
  }

  ::after {
    content: '';

    height: 100%;

    transition: 0.2s;
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

export const LinkText = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: 0.5em 0.75em;

  border-radius: 10px;

  color: ${colors.gray};
  text-align: left;

  transition: 0.2s;

  svg {
    margin-right: 1em;
  }

  :hover {
    color: ${colors.white};
    background: ${colors['dark-gray']};
  }
`;

export const Button = styled.button``;

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
