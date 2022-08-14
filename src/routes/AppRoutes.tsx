import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserRegistration from "../components/userRegistration/UserRegistration";
import PageNotFound from "../components/errorResponse/PageNotFound";
import UserLogin from "../components/userLogin/UserLogin";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
