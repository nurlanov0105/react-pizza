export const calcTotalPrice = (items) => {
   return items.reduce((sum, item) => sum + item.count * item.price, 0);
};
