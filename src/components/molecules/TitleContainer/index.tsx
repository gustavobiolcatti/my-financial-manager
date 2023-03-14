import { ReactNode } from 'react';

import * as S from './styles';

type TitleContainerProps = {
  title: string;
  children?: ReactNode;
};

const TitleContainer = ({
  title,
  children,
}: TitleContainerProps): JSX.Element => {
  return (
    <S.TitleContainer>
      <S.PageTitle>{title}</S.PageTitle>
      {children}
    </S.TitleContainer>
  );
};

export default TitleContainer;
