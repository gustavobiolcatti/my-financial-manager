import { ButtonProps } from './types';

import * as S from './styles';

const Button = ({ alert, children, ...rest }: ButtonProps): JSX.Element => {
  return (
    <S.Button alert={alert} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
