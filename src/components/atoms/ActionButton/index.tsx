import { ActionButtonProps } from './types';

import * as S from './styles';

const ActionButton = ({
  actionType,
  children,
  ...rest
}: ActionButtonProps): JSX.Element => {
  return (
    <S.ActionButton actionType={actionType} {...rest}>
      {children}
    </S.ActionButton>
  );
};

export default ActionButton;
