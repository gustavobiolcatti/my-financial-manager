import styled from 'styled-components';

import { ActionButtonProps } from './types';

export const ActionButton = styled.button<ActionButtonProps>`
  margin-left: 1em;

  transition: 0.2s;

  :hover {
    transform: scale(0.9);
  }
`;
