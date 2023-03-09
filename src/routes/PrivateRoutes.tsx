import { Navigate } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";

type PrivateRoutesProps = {
  children: JSX.Element;
};

const PrivateRoutes = ({ children }: PrivateRoutesProps): JSX.Element => {
  const { user } = useAuth();

  console.log(user);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
