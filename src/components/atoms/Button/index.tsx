import { ButtonProps } from './types';

import * as S from './styles';

const Button = ({
  alert,
  secondary,
  children,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <S.Button alert={alert} secondary={secondary} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
