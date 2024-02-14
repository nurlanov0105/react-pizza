import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLS } from "../../utils/getUserFromLS";

const { name, email, id, token } = getUserFromLS();

const initialState = {
   name,
   email,
   id,
   token,
};

const slice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser(state, action) {
         state.name = action.payload.fullName;
         state.email = action.payload.email;
         state.token = action.payload.token;
         state.id = action.payload.id;
      },
      removeUser(state) {
         state.name = null;
         state.email = null;
         state.token = null;
         state.id = null;
      },
   },
});

export const { setUser, removeUser } = slice.actions;

export default slice.reducer;
