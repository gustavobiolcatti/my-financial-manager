import { Outlet } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';

import NavigationBar from 'components/molecules/NavigationBar';

import * as S from './styles';

const Home = (): JSX.Element => {
  const { logout } = useAuth();

  return (
    <S.Container>
      <NavigationBar />
      <S.Wrapper>
        <h1>Home</h1>
        <Outlet />
        <button onClick={logout}>SAIR</button>
      </S.Wrapper>
    </S.Container>
  );
};

export default Home;
