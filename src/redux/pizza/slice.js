import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params) => {
   const { categoryId, sortBy, currentPage, searchValue } = params;
   const { data } = await axios.get(
      `https://cd167fefaf3c7818.mokky.dev/items?page=${currentPage}&limit=${8}${
         categoryId > 0 ? `&category=${categoryId}` : ""
      }&sortBy=${sortBy}${searchValue ? `&title=*${searchValue}*` : ""}`
   );

   return data;
});

const initialState = {
   items: [],
   totalPages: 0,
   status: "loading" | "succes" | "error",
};

const pizzaSlice = createSlice({
   name: "pizza",
   initialState,
   reducers: {
      setItems(state, action) {
         state.items = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = "loading";
            state.items = [];
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.totalPages = action.payload.meta.total_pages;
            state.status = "success";
         })
         .addCase(fetchPizzas.rejected, (state, action) => {
            state.status = "error";
            state.items = [];
         });
   },
});

export default pizzaSlice.reducer;
