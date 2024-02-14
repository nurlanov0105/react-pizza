import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./redux/store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Router>
         <Provider store={store}>
            <ToastContainer
               position="top-right"
               autoClose={3000}
               closeOnClick
               theme="dark"
               pauseOnHover={false}
               draggable
            />
            <App />
         </Provider>
      </Router>
   </React.StrictMode>
);
