import React from "react";
import { useNavigate } from "react-router";
import qs from "qs";

import { Categories, Sort, PizzaBlock, Pagination } from "../components";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { useSelector, useDispatch } from "react-redux";
import { fetchPizzas } from "../redux/pizza/slice";
import { setCurrentPage, setCategoryId, setFilters } from "../redux/filter/slice";

import { sortList } from "../components";

const Home = () => {
   const navigate = useNavigate();

   // Добавьте переменную состояния для отслеживания первой загрузки
   const [firstLoad, setFirstLoad] = React.useState(true);
   // React useRef
   const isSearch = React.useRef(false);
   const dispatch = useDispatch();

   const { items, totalPages, status } = useSelector((state) => state.pizza);
   const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);

   const onChangeCategory = React.useCallback((id) => {
      dispatch(setCategoryId(id));
      dispatch(setCurrentPage(1));
   }, []);

   const onChangePage = (num) => {
      dispatch(setCurrentPage(num));
   };

   const getPizzas = async () => {
      const sortBy = sort.sortProperty;
      dispatch(fetchPizzas({ categoryId, sortBy, currentPage, searchValue }));
   };

   // Если изменили первый параметр и был первый рендер, то будет данная проверка
   React.useEffect(() => {
      if (!firstLoad) {
         const queryString = qs.stringify({
            currentPage,
            categoryId,
            sortProperty: sort.sortProperty,
         });

         navigate(`?${queryString}`);
      }

      setFirstLoad(false);
   }, [categoryId, sort, searchValue, currentPage]);

   // Если был первый рендер, то проверяем URL параметры(поисковик) и сохраняем в редуксе
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1));
         const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

         dispatch(
            setFilters({
               searchValue: params.searchValue,
               categoryId: params.categoryId,
               currentPage: params.currentPage,
               sort: sort || sortList[0],
            })
         );

         isSearch.current = true;
      }
   }, []);

   // Если был первый рендер, то запрашиваем пиццы
   React.useEffect(() => {
      window.scrollTo(0, 0);

      if (!isSearch.current) {
         getPizzas();
      }

      isSearch.current = false;
   }, [categoryId, sort, searchValue, currentPage]);

   const pizzas = items
      .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map((obj) => <PizzaBlock {...obj} key={obj.id} />);
   const skeletons = [...Array(4)].map((_, i) => <Skeleton key={i} />);

   return (
      <div className="container">
         <div className="content__top">
            <Categories categoryId={categoryId} onClickCategory={(id) => onChangeCategory(id)} />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === "error" ? (
            <div className="content__error-info">
               <h2>Произошла ошибка 😕</h2>
               <p>К сожалению, не удалось получить пиццы. Попробуйте повторить позже.</p>
            </div>
         ) : (
            <>
               <div className="content__items">{status === "loading" ? skeletons : pizzas}</div>
               <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onChangePage={(num) => onChangePage(num)}
               />
            </>
         )}
      </div>
   );
};
export default Home;
