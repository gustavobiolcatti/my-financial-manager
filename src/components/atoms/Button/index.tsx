import { ButtonProps } from "./types";

import * as S from "./styles";

const Button = ({ secondary, children, ...rest }: ButtonProps): JSX.Element => {
  return (
    <S.Button secondary={secondary} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
