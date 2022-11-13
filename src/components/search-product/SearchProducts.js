import "./SearchProducts.css";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ErrorBoundary from "../error-boundaries/ErrorBoundaries";
import {useSelector} from "react-redux";
import {addToActiveList, filterProducts, deleteFromFilteredList} from "../../reducers/productsReducer";

const SearchProducts = () => {
	const [filter, setFilter] = useState("");
	const dispatch = useDispatch();
	const {products, filteredProducts, activeProducts} = useSelector(state => state.products);
	
	const filterFunction = (str) => {
		if (str.trim()) {
			dispatch(filterProducts(str));
		}
	};
	useEffect(() => {
		filterFunction(filter);
	}, [filter, products]);
	
	
	// const deleteItemFromList = (id) => {
	// 	dispatch(deleteFromFilteredList(id))
	// };
	
	
	const list = filteredProducts
		.filter(item => !activeProducts.includes(item))
		.map((el, i) => {
		return (<div key={i}>
				{el.name.toUpperCase()}
				<button onClick={() => {
					dispatch(addToActiveList(el.id));
					dispatch(deleteFromFilteredList(el.id))
					setFilter('');
				}}
				>Добавить
				</button>
			</div>);
	});
	const content = list || <h1>нет выбранных продуктов</h1>;
	
	useEffect(() => {
		dispatch(filterProducts(filter))
	}, [filter]);
	
	
	return (<div>
			<input type="search" placeholder="Название продукта" value={filter}
			       onChange={(e) => setFilter(e.target.value)}/>
			<ErrorBoundary>
				{content}
			</ErrorBoundary>
		</div>);
};

export default SearchProducts;