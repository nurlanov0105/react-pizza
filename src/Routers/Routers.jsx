import { Routes, Route } from "react-router";

import Home from "../pages/Home";
import Cart from "../pages/Cart";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />

         <Route path="/*" element={<ProtectedRoute />}>
            <Route path="cart" element={<Cart />} />
         </Route>

         <Route path="login" element={<LoginPage />} />
         <Route path="register" element={<RegisterPage />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default Routers;
