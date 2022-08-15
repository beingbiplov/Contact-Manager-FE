import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserRegistration from "../components/userRegistration/UserRegistration";
import PageNotFound from "../components/errorResponse/PageNotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<UserRegistration />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
