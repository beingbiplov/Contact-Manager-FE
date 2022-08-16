import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoutes from "../components/protectedRoutes/ptotectedRoutes";
import UserRegistration from "../components/userRegistration/UserRegistration";
import PageNotFound from "../components/errorResponse/PageNotFound";
import UserLogin from "../components/userLogin/UserLogin";
import Dashboard from "../components/dashboard/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
