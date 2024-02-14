import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Form from "./Form";
import { useSelector } from "react-redux";

const Register = () => {
   const navigate = useNavigate();

   const { id: userId } = useSelector((state) => state.user);

   const handleRegister = async (e, name, email, password) => {
      e.preventDefault();
      const res = await axios.post(`https://cd167fefaf3c7818.mokky.dev/register`, {
         fullName: name,
         email: email,
         password: password,
      });

      if (res.status === 201) {
         const { id: userId } = res.data.data;
         await axios.post(`https://cd167fefaf3c7818.mokky.dev/cart`, {
            id: userId,
            userId,
            userCart: [],
         });

         navigate("/login");
      }
   };

   return (
      <div>
         <Form title="Sign in" handleClick={handleRegister} />
         <p className="mt-5 text-center text-sm text-gray-500">
            Alredy have an account ?
            <Link
               to="/login"
               className="pl-1.5 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
               Log in
            </Link>
         </p>
      </div>
   );
};

export default Register;
