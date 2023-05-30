import { ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AddButton = ({ ...rest }: AddButtonProps): JSX.Element => {
  return (
    <S.AddButton {...rest}>
      <S.AddIcon size={24} />
    </S.AddButton>
  );
};

export default AddButton;
