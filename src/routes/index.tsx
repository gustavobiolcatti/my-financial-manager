import {
  BrowserRouter,
  Outlet,
  redirect,
  Route,
  Routes,
} from 'react-router-dom';

import AuthProvider from 'contexts/AuthContext';
import MenuProvider from 'contexts/MenuContext';

import Error from 'pages/Error';
import Login from 'pages/Login';
import Home from 'pages/Home';
import Transations from 'pages/Transations';
import Dashboard from 'pages/Dashboard';
import Accounts from 'pages/Accounts';
import Categories from 'pages/Categories';

import PrivateRoutes from 'routes/PrivateRoutes';

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
            <Route
              element={
                <PrivateRoutes>
                  <Outlet />
                </PrivateRoutes>
              }
            >
              <Route
                path="/"
                element={<Home />}
                loader={() => redirect('dashboard')}
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="transations" element={<Transations />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="categories" element={<Categories />} />
              </Route>
            </Route>
          </Routes>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
