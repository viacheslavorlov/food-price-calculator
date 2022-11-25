import "./SearchProducts.css";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import ErrorBoundary from "../error-boundaries/ErrorBoundaries";
import {useSelector} from "react-redux";
import {addToActiveList, filterProducts} from "../../reducers/productsReducer";

const SearchProducts = () => {
	const [filter, setFilter] = useState("");
	const dispatch = useDispatch();
	const {products, filteredProducts, activeProducts} = useSelector(state => state.products);
	
	const filterFunction = (str) => {
		dispatch(filterProducts(str.toLowerCase().trim()));
	};
	
	
	useEffect(() => {
		filterFunction(filter);
	}, [filter, products, activeProducts]);
	
	useEffect(() => {
		filterFunction(filter);
	}, []);
	
	
	const list = filteredProducts
		
		.filter(item => activeProducts.filter(el => el.name !== item.name))
		.map((el, i) => {
			return (<div key={i} className={"active-list-element"}>
				{el.name.toUpperCase()}
				<button onClick={() => {
					dispatch(addToActiveList(el.id));
					setFilter("");
				}}
				        className={"add-btn-round"}
				>Добавить
				</button>
			</div>);
		});
	const content = list || <h1>нет выбранных продуктов</h1>;
	
	
	return (
		<div>
			<h3>Поиск продуктов</h3>
			<input type="search" placeholder="Название продукта" value={filter}
			       onChange={(e) => setFilter(e.target.value)}/>
			<ErrorBoundary>
				{content}
			</ErrorBoundary>
		</div>);
};

export default SearchProducts;