import React, {useEffect, useState} from "react";

import ErrorBoundary from "../error-boundaries/ErrorBoundaries";

const SearchProducts = ({productList, setProductList, listFinal, setListFinal}) => {
	const [filter, setFilter] = useState("");
	const [activeList, setActiveList] = useState([]);
	
	const addItemToStateStorage = (filter) => {
		const newItem = [...productList].filter(item => item.name === filter);
		setListFinal(() => [...listFinal, ...newItem]);
		console.log("listFinal", listFinal);
		setFilter(() => "");
		
	};
	const deleteItemFromActiveList = (e, name) => {
		const newArr = activeList.filter(item => item.name !== name);
		setActiveList(activeList => newArr);
	}
	
	
	const list = activeList.filter(item => item.name.match(filter))
		.map((item, i) => {
			return (
				<li key={i}>
					{item.name.toUpperCase()}
					<button onClick={
						(e) => {
							addItemToStateStorage(item.name);
							e.target.parentElement.remove();
						}
					}
					>Добавить
					</button>
				</li>
			);
		});
	
	useEffect(() => {
		setActiveList(productList);
		setFilter("");
	}, []);
	
	useEffect(() => {
		setActiveList(productList);
	}, [productList]);
	
	return (
		<div>
			<input type="search" placeholder="Название продукта" value={filter}
			       onChange={(e) => setFilter(e.target.value)}/>
			<ul>
				<ErrorBoundary>
					{list}
				</ErrorBoundary>
			</ul>
		</div>
	);
};

export default SearchProducts;