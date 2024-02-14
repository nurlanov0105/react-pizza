import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
   return (
      <div className={styles.notFound}>
         <h2>Ничего не найдено 😕</h2>
         <p>К сожалению данная страница отсутствует в нашем интернет магазине.</p>
         <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
         </Link>
      </div>
   );
};
