import { FormHTMLAttributes } from 'react';

import * as S from './styles';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  title: string;
};

const Form = ({ title, children, ...rest }: FormProps): JSX.Element => {
  return (
    <S.Form {...rest}>
      <S.Title id="modal-title">{title}</S.Title>
      {children}
    </S.Form>
  );
};

export default Form;
