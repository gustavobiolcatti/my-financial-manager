import { Link } from 'react-router-dom';
import * as S from './styles';

const NavigationBar = () => {
  return (
    <S.Container>
      <Link to="/dashboard">
        <S.NavLink>Dashboard</S.NavLink>
      </Link>
      <Link to="/banks">
        <S.NavLink>Bancos</S.NavLink>
      </Link>
      <Link to="/transations">
        <S.NavLink>Extrato</S.NavLink>
      </Link>
    </S.Container>
  );
};

export default NavigationBar;
