import styled, { css } from 'styled-components';

import colors from 'assets/colors';

import { CardBalanceProps, CardProps } from './types';

export const Card = styled.div<CardProps>`
  ${({ newCard }) => css`
    display: flex;
    align-items: ${newCard && 'center'};
    justify-content: ${newCard && 'center'};

    flex-direction: column;

    padding: 1em;

    border-radius: 10px;

    background: ${colors.white};

    box-shadow: 0 0 2px ${colors.black};
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardTitle = styled.p`
  font-size: 1.5em;
  font-weight: 600;
  text-transform: uppercase;
`;

export const CardDescription = styled.p`
  margin: 0;
  font-size: 0.8em;
`;

export const CardBalance = styled.p<CardBalanceProps>`
  ${({ negative, positive }) => css`
    margin-top: 1em;
    margin-left: auto;

    color: ${positive ? colors.green : negative ? colors.red : colors.black};
    font-size: 3em;
  `}
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
`;
