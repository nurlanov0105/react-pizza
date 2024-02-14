import { calcTotalCount } from "./calcTotalCount";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
   const data = localStorage.getItem("cart");
   const items = data ? JSON.parse(data) : [];
   const totalCount = calcTotalCount(items);
   const totalPrice = calcTotalPrice(items);

   return {
      items,
      totalCount,
      totalPrice,
   };
};
