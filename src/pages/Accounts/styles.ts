import styled, { css } from 'styled-components';

import colors from 'assets/colors';

import { CardProps } from './types';

export const Container = styled.div`
`;

export const Wrapper = styled.div`
  display: flex;

  padding: 1em 0;
`;

export const Card = styled.div<CardProps>`
  ${({newCard}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  width: 30%;

  padding: 2em;

  border-radius: 10px;

  box-shadow: 0 0 2px ${colors.black};
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

  box-shadow: 0 0 4px ${colors.black};
`;