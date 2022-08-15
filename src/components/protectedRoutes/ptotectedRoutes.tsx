import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const ProtectedRoutes = () => {
  let isAuthenticated = useSelector(
    (state: RootState) => state.userAuth.isAuthenticated
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
