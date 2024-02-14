import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { getCartFromLS } from '../../utils/getCartFromLS';

export const fetchCart = createAsyncThunk(
   'pizza/fetchCart',
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await axios.get(`https://cd167fefaf3c7818.mokky.dev/cart/${id}`);

         return data;
      } catch (error) {
         console.log('fetchCart', error);
         return rejectWithValue(error.message);
      }
   }
);

export const addCart = createAsyncThunk(
   'pizza/addCart',
   async (userObj, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axios.get(`https://cd167fefaf3c7818.mokky.dev/cart`);

         const findUserObj = data.find((obj) => obj.userId === userObj.userId);

         // Получаем объект текущего пользователя
         const { data: userData } = await axios.get(
            `https://cd167fefaf3c7818.mokky.dev/cart/${findUserObj.id}`
         );

         // Проверяем, есть ли товар с указанным ID в корзине
         const existingItem = userData.userCart.find(
            (cartItem) =>
               cartItem.parentId === userObj.item.parentId &&
               cartItem.type === userObj.item.type &&
               cartItem.size === userObj.item.size
         );

         if (existingItem) {
            existingItem.count += 1;

            const { data } = await axios.patch(
               `https://cd167fefaf3c7818.mokky.dev/cart/${userData.id}`,
               {
                  userCart: userData.userCart,
               }
            );
            // dispatch(addItem(existingItem));

            return data;
         } else {
            const { data: postedData } = await axios.patch(
               `https://cd167fefaf3c7818.mokky.dev/cart/${userData.id}`,
               {
                  userCart: [...userData.userCart, userObj.item],
               }
            );

            // dispatch(addItem(userObj.item));

            return postedData;
         }
      } catch (error) {
         console.log('addCart', error);

         return rejectWithValue(error.message);
      }
   }
);

export const minusCart = createAsyncThunk(
   'pizza/minusCart',
   async (userObj, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axios.get(`https://cd167fefaf3c7818.mokky.dev/cart`);

         const findUserObj = data.find((obj) => obj.userId === userObj.userId);

         // Получаем объект текущего пользователя
         const { data: userData } = await axios.get(
            `https://cd167fefaf3c7818.mokky.dev/cart/${findUserObj.id}`
         );

         // Проверяем, есть ли товар с указанным ID в корзине
         const existingItem = userData.userCart.find(
            (cartItem) =>
               cartItem.parentId === userObj.item.parentId &&
               cartItem.type === userObj.item.type &&
               cartItem.size === userObj.item.size
         );

         if (existingItem) {
            existingItem.count -= 1;

            const { data } = await axios.patch(
               `https://cd167fefaf3c7818.mokky.dev/cart/${userData.id}`,
               {
                  userCart: userData.userCart,
               }
            );
            // dispatch(minusItem(existingItem));

            return data;
         }
      } catch (error) {
         console.log('minusCart', error);
         return rejectWithValue(error.message);
      }
   }
);

export const deleteCart = createAsyncThunk(
   'pizza/deleteCart',
   async (userObj, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axios.get(`https://cd167fefaf3c7818.mokky.dev/cart`);

         const findUserObj = data.find((obj) => obj.userId === userObj.userId);

         // Получаем объект текущего пользователя
         const { data: userData } = await axios.get(
            `https://cd167fefaf3c7818.mokky.dev/cart/${findUserObj.id}`
         );

         // Проверяем, есть ли товар с указанным ID в корзине
         const existingItem = userData.userCart.find(
            (cartItem) =>
               cartItem.parentId === userObj.item.parentId &&
               cartItem.type === userObj.item.type &&
               cartItem.size === userObj.item.size
         );

         if (existingItem) {
            const filteredCart = userData.userCart.filter(
               (cartItem) =>
                  cartItem.parentId !== userObj.item.parentId ||
                  cartItem.type !== userObj.item.type ||
                  cartItem.size !== userObj.item.size
            );

            const { data } = await axios.patch(
               `https://cd167fefaf3c7818.mokky.dev/cart/${userData.id}`,
               {
                  userCart: filteredCart,
               }
            );

            // dispatch(removeItem(userObj.item));
            return data;
         }
      } catch (error) {
         console.log('deleteCart', error);

         return rejectWithValue(error.message);
      }
   }
);

export const clearCart = createAsyncThunk(
   'pizza/clearCart',
   async (userId, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axios.get(`https://cd167fefaf3c7818.mokky.dev/cart`);

         const findUserObj = data.find((obj) => obj.userId === userId);

         // Получаем объект текущего пользователя
         const { data: userData } = await axios.get(
            `https://cd167fefaf3c7818.mokky.dev/cart/${findUserObj.id}`
         );
         if (userData) {
            await axios.patch(`https://cd167fefaf3c7818.mokky.dev/cart/${userData.id}`, {
               userCart: [],
            });
         }

         // dispatch(clearItems());
         return data;
      } catch (error) {
         console.log('clearCart', error);
         return rejectWithValue(error.message);
      }
   }
);

// const { items, totalCount, totalPrice } = getCartFromLS();

const initialState = {
   items: [],
   totalCount: 0,
   totalPrice: 0,
};

const setError = (state, action) => {
   console.log(action.error);
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action) {
         const { id, parentId, type, size, title, imageUrl, price } = action.payload;

         // Проверяем, есть ли уже такой товар в корзине
         const existingItem = state.items.find(
            (item) => item.parentId === parentId && item.type === type && item.size === size
         );

         // Проверяем, есть ли уже такой товар в корзине
         if (existingItem) {
            state.items = state.items.map((item) =>
               item.parentId === parentId && item.type === type && item.size === size
                  ? { ...item, count: item.count + 1 }
                  : item
            );
         } else {
            // Если товара нет в корзине, добавляем новый
            state.items.push({
               id,
               parentId,
               type,
               size,
               title,
               imageUrl,
               price,
               count: 1,
            });
         }

         // Обновляем общее количество и стоимость
         state.totalPrice = calcTotalPrice(state.items);
         state.totalCount = calcTotalCount(state.items);
      },
      minusItem(state, action) {
         const { id, parentId, type, size } = action.payload;
         const findItem = state.items.find(
            (obj) => obj.parentId === parentId && obj.type === type && obj.size === size
         );

         if (findItem) {
            state.items = state.items.map((item) =>
               item.parentId === parentId && item.type === type && item.size === size
                  ? { ...item, count: item.count - 1 }
                  : item
            );

            // if (findItem.count <= 0) {
            //    // Если количество достигло нуля, удаляем товар из корзины
            //    state.items = state.items.filter(
            //       (obj) => !(obj.parentId === parentId && obj.type === type && obj.size === size)
            //    );
            // }
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
         }
      },
      removeItem(state, action) {
         const { id, parentId, type, size } = action.payload;
         const findItem = state.items.find(
            (obj) => obj.parentId === parentId && obj.type === type && obj.size === size
         );

         if (findItem) {
            state.totalPrice -= findItem.count * findItem.price;
            state.totalCount -= findItem.count;
         }

         state.items = state.items.filter(
            (obj) => !(obj.parentId === parentId && obj.type === type && obj.size === size)
         );
      },
      clearItems(state) {
         state.items = [];
         state.totalPrice = 0;
         state.totalCount = 0;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchCart.pending, (state) => {
            state.status = 'loading';
            state.items = [];
         })
         .addCase(fetchCart.fulfilled, (state, action) => {
            state.items = action.payload.userCart;
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
            state.status = 'success';
         })
         .addCase(fetchCart.rejected, (state) => {
            state.status = 'error';
            state.items = [];
         })

         .addCase(addCart.fulfilled, (state) => {
            state.status = 'success';
            toast.success('Successfully added');
         })
         .addCase(minusCart.fulfilled, (state) => {
            state.status = 'success';
            toast.success('Minus Pizza!');
         })
         .addCase(deleteCart.fulfilled, (state) => {
            state.status = 'success';
            toast.success('Pizza deleted!');
         })
         .addCase(clearCart.fulfilled, (state) => {
            state.status = 'success';
            toast.success('Cart Empty!');
         })
         .addCase(addCart.rejected, setError)
         .addCase(deleteCart.rejected, setError)
         .addCase(minusCart.rejected, setError)
         .addCase(clearCart.rejected, setError);
   },
});

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
