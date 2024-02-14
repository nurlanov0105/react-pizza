import React from "react";

export const Categories = React.memo(({ categoryId, onClickCategory }) => {
   const categoryTypes = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

   return (
      <div className="categories">
         <ul>
            {categoryTypes.map((val, i) => (
               <li
                  key={i}
                  onClick={() => onClickCategory(i)}
                  className={categoryId === i ? "active" : ""}>
                  {val}
               </li>
            ))}
         </ul>
      </div>
   );
});
