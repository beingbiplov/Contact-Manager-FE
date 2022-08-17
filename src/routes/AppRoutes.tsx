import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoutes from "../components/protectedRoutes/ptotectedRoutes";
import UserRegistration from "../components/userRegistration/UserRegistration";
import PageNotFound from "../components/errorResponse/PageNotFound";
import UserLogin from "../components/userLogin/UserLogin";
import Dashboard from "../components/dashboard/Dashboard";
import DetailsPage from "../components/details/DetailsPage";
import Navigation from "../components/dashboard/Navigation";
import Unauthorized from "../components/errorResponse/Unauthorized";
import UserUpdate from "../components/details/UpdateUserDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Dashboard />} />
            <Route path="/contact/:id" element={<DetailsPage />} />
            <Route path="user/update" element={<UserUpdate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
