import { ButtonHTMLAttributes } from 'react';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import * as S from './styles';

type AddButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const AddButton = ({ ...rest }: AddButtonProps): JSX.Element => {
  return (
    <S.AddButton {...rest}>
      <BsFillPlusSquareFill />
    </S.AddButton>
  );
};

export default AddButton;
