import { FaPencilAlt } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

import { ActionButtonProps } from './types';

import colors from 'assets/colors';

import * as S from './styles';

const ActionButton = ({
  actionType,
  children,
  ...rest
}: ActionButtonProps): JSX.Element => {
  return (
    <S.ActionButton actionType={actionType} {...rest}>
      {actionType === 'update' ? (
        <FaPencilAlt size={20} color={colors.gray} />
      ) : (
        <FaTrashAlt size={20} color={colors.gray} />
      )}
      {children}
    </S.ActionButton>
  );
};

export default ActionButton;
