import * as S from './styles';

const EmptyBox = (): JSX.Element => {
  return (
    <S.Container>
      <S.Message>Não há dados para serem exibidos</S.Message>
    </S.Container>
  );
};

export default EmptyBox;
