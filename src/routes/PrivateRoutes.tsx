import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";

type PrivateRoutesProps = {
  children: JSX.Element;
};

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const { user } = useAuth();

  if (!user) {
    <Navigate to={"/"} />;
  }

  return children;
};

export default PrivateRoutes;
