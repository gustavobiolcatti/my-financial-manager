import styled, { css } from 'styled-components';

import colors from 'assets/colors';

import { CategoryColorProps } from './types';

export const Table = styled.table`
  width: 100%;

  border-radius: 10px;

  background: ${colors.white};

  box-shadow: 0 0 2px ${colors.gray};
`;

export const TableHeadColumn = styled.th`
  padding: 0.5em 1.3em;

  border-bottom: 2px solid ${colors.gray};

  color: ${colors['dark-gray']};
  font-size: 1.3em;
  font-weight: 500;
  text-align: left;
  text-transform: capitalize;
`;

export const TableColumn = styled.td`
  padding: 1.5em;

  border-bottom: 1px solid ${colors['light-gray']};

  font-size: 1.1em;
  text-transform: capitalize;
`;

export const CategoryColor = styled.div<CategoryColorProps>`
  ${({ color }) => css`
    width: 20px;
    height: 20px;

    border-radius: 50%;

    background: ${color};
  `}
`;

export const ActionButtonWrapper = styled.div`
  display: flex;

  button {
    margin-right: 1em;
  }
`;
