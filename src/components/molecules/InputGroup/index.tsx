import * as S from './styles';

import { InputGroupProps } from './types';

const InputGroup = ({
  children,
  singleColumn,
}: InputGroupProps): JSX.Element => {
  return <S.InputGroup singleColumn={singleColumn}>{children}</S.InputGroup>;
};

export default InputGroup;
