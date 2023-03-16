import { Transation } from 'models/transation';

import * as S from './styles';

type TransationsTableProps = {
  transations: Transation[];
};

const TransationsTable = ({
  transations,
}: TransationsTableProps): JSX.Element => {
  return (
    <>
      <S.Table>
        <thead>
          <tr>
            <S.TableHeadColumn>data</S.TableHeadColumn>
            <S.TableHeadColumn>categoria</S.TableHeadColumn>
            <S.TableHeadColumn>descrição</S.TableHeadColumn>
            <S.TableHeadColumn>conta</S.TableHeadColumn>
            <S.TableHeadColumn>valor</S.TableHeadColumn>
            <S.TableHeadColumn>opções</S.TableHeadColumn>
          </tr>
        </thead>
      </S.Table>
      ;
    </>
  );
};

export default TransationsTable;
