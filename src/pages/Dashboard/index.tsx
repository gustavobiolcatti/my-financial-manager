import { Outlet } from "react-router-dom";

const Dashboard = (): JSX.Element => {
  return (
    <>
      <h1>Dashboard</h1>;
      <Outlet />
    </>
  );
};

export default Dashboard;
