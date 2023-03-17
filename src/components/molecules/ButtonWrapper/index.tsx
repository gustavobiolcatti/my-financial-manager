import { HTMLAttributes } from 'react';

import * as S from './styles';

export type ButtonWrapperProps = HTMLAttributes<HTMLDivElement>;

const ButtonWrapper = ({ children }: ButtonWrapperProps): JSX.Element => {
  return <S.ButtonContainer>{children}</S.ButtonContainer>;
};

export default ButtonWrapper;
