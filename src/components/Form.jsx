import React from "react";

import { useLocation } from "react-router";

const Form = ({ title, handleClick }) => {
   const { pathname } = useLocation();

   const [name, setName] = React.useState("");
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");

   return (
      <div>
         <div className="flex min-h-full flex-col justify-center px-6  lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
               <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  {title} to your account
               </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
               <form className="space-y-6">
                  {pathname === "/register" ? (
                     <div>
                        <label
                           htmlFor="name"
                           className="block text-sm font-medium leading-6 text-gray-900">
                           Your name
                        </label>
                        <div className="mt-2">
                           <input
                              id="name"
                              type="text"
                              required
                              className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                           />
                        </div>
                     </div>
                  ) : (
                     ""
                  )}
                  <div>
                     <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                     </label>
                     <div className="mt-2">
                        <input
                           id="email"
                           type="email"
                           required
                           className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                        />
                     </div>
                  </div>

                  <div>
                     <div className="flex items-center justify-between">
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium leading-6 text-gray-900">
                           Password
                        </label>
                     </div>
                     <div className="mt-2">
                        <input
                           id="password"
                           type="password"
                           required
                           className="block px-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                        />
                     </div>
                  </div>

                  <div className="text-center">
                     <button
                        type="submit"
                        className="form-button mx-auto"
                        onClick={(e) => handleClick(e, name, email, password)}>
                        {title}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Form;
