import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';

import Button from 'components/atoms/Button';

import Logo from 'assets/img/logo.svg';

import * as S from './styles';

const Login = (): JSX.Element => {
  const { signInWithGoogle, signed } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (signed) navigate('/dashboard');
  }, [signed]);

  return (
    <S.Container>
      <S.Content>
        <S.Image src={Logo} />
        <S.LogoTitle>My Financial Manager</S.LogoTitle>
        <Button secondary onClick={signInWithGoogle}>
          <S.GoogleIcon />
          Entrar com o Google
        </Button>
      </S.Content>
    </S.Container>
  );
};

export default Login;
