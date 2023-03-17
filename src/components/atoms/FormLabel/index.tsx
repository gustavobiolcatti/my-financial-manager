import { LabelHTMLAttributes } from 'react';

import * as S from './styles';

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const FormLabel = ({ children, ...rest }: FormLabelProps): JSX.Element => {
  return <S.Label {...rest}>{children}</S.Label>;
};

export default FormLabel;
