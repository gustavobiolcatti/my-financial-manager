import { DatePicker } from 'rsuite';

import TitleContainer from 'components/molecules/TitleContainer';
import AddButton from 'components/atoms/AddButton';

import * as S from './styles';

const Transations = (): JSX.Element => {
  return (
    <>
      <TitleContainer title="transações">
        <AddButton onClick={() => {}} />
      </TitleContainer>
      <S.Container>
        <S.Transations>
          <DatePicker
            format="yyyy-MM"
            placeholder="Mês"
            style={{ width: 200 }}
          />
        </S.Transations>
        <S.Charts>Gráficos</S.Charts>
      </S.Container>
    </>
  );
};

export default Transations;
