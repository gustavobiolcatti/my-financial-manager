import { ActionButtonProps } from './types';

import * as S from './styles';

const ActionButton = ({
  actionType,
  children,
  ...rest
}: ActionButtonProps): JSX.Element => {
  return (
    <S.ActionButton actionType={actionType} {...rest}>
      {actionType === 'update' ? (
        <S.PencilIcon size={40} title="Editar" />
      ) : (
        <S.TrashIcon size={24} title="Excluir" />
      )}
      {children}
    </S.ActionButton>
  );
};

export default ActionButton;
