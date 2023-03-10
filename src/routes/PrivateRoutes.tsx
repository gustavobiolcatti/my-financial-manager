import { Navigate } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';

type PrivateRoutesProps = {
  children: JSX.Element;
};

const PrivateRoutes = ({ children }: PrivateRoutesProps): JSX.Element => {
  const { signed } = useAuth();

  return signed ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
