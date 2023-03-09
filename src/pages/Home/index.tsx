import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Home = (): JSX.Element => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <h1>Home</h1>;
      <Outlet />
    </>
  );
};

export default Home;
