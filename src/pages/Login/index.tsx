import { useAuth } from "contexts/AuthContext";

import * as S from "./styles";

const Login = (): JSX.Element => {
  const { signInWithGoogle } = useAuth();

  const login = async () => {
    await signInWithGoogle();
  };

  return (
    <S.Container>
      <S.Button onClick={login}>Entrar com o Google</S.Button>
    </S.Container>
  );
};

export default Login;
