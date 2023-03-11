import styled, { css } from 'styled-components';

import colors from 'assets/colors';

import { ButtonProps } from './types';

export const Button = styled.button<ButtonProps>`
  ${({ alert }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1em;

    border: none;
    border-radius: 10px;

    background: ${alert ? colors.red : colors.white};

    color: ${alert ? colors.white : colors.black};
    font-size: 1em;
    font-weight: 600;
    text-align: center;

    box-shadow: 0 0 5px 0px ${colors.gray};

    transition: 0.2s;

    cursor: pointer;

    svg {
      margin-right: 1em;
    }

    :hover {
      transform: scale(0.98);
    }
  `}
`;
