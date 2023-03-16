import { ReactNode } from 'react';

import * as S from './styles';

type CardProps = {
  title: string;
  description: string;
  balance: number;
  children: ReactNode;
};

const Card = ({
  title,
  description,
  balance,
  children,
}: CardProps): JSX.Element => {
  return (
    <S.Card>
      <S.CardHeader>
        <div>
          <S.CardTitle>{title}</S.CardTitle>
          <S.CardDescription>{description}</S.CardDescription>
        </div>
        <S.ActionButtonWrapper>{children}</S.ActionButtonWrapper>
      </S.CardHeader>
      <S.CardBalance negative={balance < 0} positive={balance > 0}>
        R$ {balance.toFixed(2)}
      </S.CardBalance>
    </S.Card>
  );
};

export default Card;
