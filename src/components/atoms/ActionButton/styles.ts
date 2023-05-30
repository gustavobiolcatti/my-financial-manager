import styled from 'styled-components';
import { Pencil } from '@styled-icons/evil/Pencil';
import { Trash } from '@styled-icons/ionicons-outline/Trash';

import colors from 'assets/colors';

import { ActionButtonProps } from './types';

export const ActionButton = styled.button<ActionButtonProps>`
  margin-left: 0.5em;

  transition: 0.2s;

  :hover {
    transform: scale(0.9);
  }
`;

export const PencilIcon = styled(Pencil)`
  color: ${colors.gray};
`;

export const TrashIcon = styled(Trash)`
  color: ${colors.gray};
`;
