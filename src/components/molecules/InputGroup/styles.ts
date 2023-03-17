import styled, { css } from 'styled-components';

import { InputGroupProps } from './types';

export const InputGroup = styled.div<InputGroupProps>`
  ${({ singleColumn }) => css`
    grid-column: ${!singleColumn && 'span 2'};
  `}
`;
