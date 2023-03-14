import { Transation } from 'models/transation';

import * as S from './styles';

type TransationsTabelProps = {
  transations: Transation[];
};

const TransationsTabel = ({
  transations,
}: TransationsTabelProps): JSX.Element => {
  return <S.Table></S.Table>;
};

export default TransationsTabel;
