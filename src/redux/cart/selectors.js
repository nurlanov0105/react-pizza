export const selectCart = (state) => state.cart;
export const selectCartItemCount = (state, pizzaId) => {
   const totalItemCount = state.cart.items
      .filter((item) => item.parentId === pizzaId)
      .reduce((sum, item) => sum + item.count, 0);
   return totalItemCount;
};
