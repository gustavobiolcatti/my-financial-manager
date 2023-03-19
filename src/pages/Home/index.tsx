import { Outlet } from 'react-router-dom';

import NavigationBar from 'components/molecules/NavigationBar';
import Header from 'components/atoms/Header';

import * as S from './styles';

const Home = (): JSX.Element => {
  return (
    <>
      <NavigationBar />
      <S.Wrapper>
        <Header />
        <Outlet />
      </S.Wrapper>
    </>
  );
};

export default Home;
