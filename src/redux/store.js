import { configureStore } from "@reduxjs/toolkit";

import pizza from "./pizza/slice";
import filter from "./filter/slice";
import cart from "./cart/slice";
import user from "./user/slice";

export const store = configureStore({
   reducer: {
      pizza,
      filter,
      cart,
      user,
   },
});
