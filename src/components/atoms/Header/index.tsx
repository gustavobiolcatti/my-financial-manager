import { useAuth } from 'contexts/AuthContext';

import * as S from './styles';

const Header = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <S.Container>
      <S.UserName>{user?.name}</S.UserName>
    </S.Container>
  );
};

export default Header;
