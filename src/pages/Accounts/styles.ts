import styled, { css } from 'styled-components';

import colors from 'assets/colors';

import { CardBalanceProps, CardProps } from './types';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 64px;

  padding: 1em 0;
`;

export const Accounts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 16px;

  grid-column: span 2;
`;

export const Charts = styled.div`
  padding: 1em;

  border-radius: 10px;

  background: ${colors.white};
`;

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
  font-size: 0.8em;
`;

export const Button = styled.button`
  width: 25px;
  height: 25px;

  background: url(src/assets/img/trash.svg);
  background-repeat: no-repeat;
  background-size: cover;

  transition: 0.2s;

  :hover {
    transform: scale(0.9);
  }
`;

export const CardBalance = styled.p<CardBalanceProps>`
  ${({ negative, positive }) => css`
    margin-top: 1em;
    margin-left: auto;

    color: ${positive ? colors.green : negative ? colors.red : colors.black};
    font-size: 3em;
  `}
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 75px;
  height: 75px;

  border-radius: 50%;
  border: 3px solid ${colors.purple};

  color: ${colors.purple};
  font-size: 5em;
`;
