import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from 'contexts/AuthContext';

import Button from 'components/atoms/Button';

import logo from 'assets/img/my-financial-manager-logo.png';

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
        <S.Image src={logo} />
        <S.LogoTitle>My Financial Manager</S.LogoTitle>
        <Button secondary onClick={signInWithGoogle}>
          <FcGoogle size={24} />
          Entrar com o Google
        </Button>
      </S.Content>
    </S.Container>
  );
};

export default Login;
