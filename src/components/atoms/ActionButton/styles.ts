import styled, { css } from 'styled-components';

import { ActionButtonProps } from './types';

export const ActionButton = styled.button<ActionButtonProps>`
  ${({ actionType }) => css`
    width: 25px;
    height: 25px;

    margin-left: 0.5em;

    background: ${actionType === 'delete'
      ? 'url(src/assets/img/trash.svg)'
      : 'url(src/assets/img/pencil.svg)'};
    background-repeat: no-repeat;
    background-size: cover;

    transition: 0.2s;

    :hover {
      transform: scale(0.9);
    }
  `}
`;
