import { Outlet, Navigate } from "react-router-dom";

const Home = ({ user }) => {
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Home;
