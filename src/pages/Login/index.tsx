import { FcGoogle } from 'react-icons/fc';

import { useAuth } from 'contexts/AuthContext';

import Button from 'components/atoms/Button';

import * as S from './styles';

const Login = (): JSX.Element => {
  const { signInWithGoogle } = useAuth();

  return (
    <S.Container>
      <Button onClick={signInWithGoogle}>
        <FcGoogle size={24} />
        Entrar com o Google
      </Button>
    </S.Container>
  );
};

export default Login;
