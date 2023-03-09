import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "contexts/AuthContext";

import Button from "components/atoms/Button";

import * as S from "./styles";

const Login = (): JSX.Element => {
  const { signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();

      navigate("/dashboard");
    } catch (error) {
      const err = error as Error;

      console.log("ERROR =>> ", err.message);
    }
  };

  return (
    <S.Container>
      <Button onClick={handleLogin}>
        <FcGoogle size={24} />
        Entrar com o Google
      </Button>
    </S.Container>
  );
};

export default Login;
