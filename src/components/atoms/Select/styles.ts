import styled from 'styled-components';

import colors from 'assets/colors';

import { SelectProps } from './types';

export const Select = styled.select<SelectProps>`
  padding: 1em;
  margin-bottom: 1.5em;

  border-bottom: 1px solid ${colors.gray};
`;
