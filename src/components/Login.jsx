import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCart } from "../redux/cart/slice";
import { setUser } from "../redux/user/slice";

import Form from "./Form";

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = async (e, _, email, password) => {
      e.preventDefault();
      const res = await axios.post(`https://cd167fefaf3c7818.mokky.dev/auth`, {
         email: email,
         password: password,
      });

      if (res.status === 201) {
         const { fullName, email, id, token } = res.data.data;

         const { data } = await axios.get(`https://cd167fefaf3c7818.mokky.dev/cart`);
         const findUserObj = data.find((obj) => obj.userId === id);

         const userJson = JSON.stringify({ fullName, email, id, token });
         localStorage.setItem("user", userJson);

         dispatch(setUser({ fullName, email, id, token }));
         dispatch(fetchCart(findUserObj));
         navigate("/");
      }
   };
   return (
      <div>
         <Form title="Log in" handleClick={handleLogin} />
         <p className="mt-5 text-center text-sm text-gray-500">
            Don`t have an account ?
            <Link
               to="/register"
               className="pl-1.5 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
               Sign in
            </Link>
         </p>
      </div>
   );
};

export default Login;
