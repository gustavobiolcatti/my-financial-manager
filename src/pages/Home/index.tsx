import { Outlet } from 'react-router-dom';

import NavigationBar from 'components/molecules/NavigationBar';

import * as S from './styles';
import Header from 'components/atoms/Header';

const Home = (): JSX.Element => {
  return (
    <S.Container>
      <NavigationBar />
      <S.Wrapper>
        <Header />
        <Outlet />
      </S.Wrapper>
    </S.Container>
  );
};

export default Home;
