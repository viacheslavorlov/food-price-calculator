import React, {useEffect, useState} from "react";

import ErrorBoundary from "../error-boundaries/ErrorBoundaries";

const SearchProducts = ({productList, setProductList, listFinal, setListFinal}) => {
	const [filter, setFilter] = useState("");
	const [activeList, setActiveList] = useState([]);
	
	const addItemToStateStorage = (filter) => {
		const newItem = JSON.parse(localStorage.getItem("products"))
			.filter(item => item.name.match(filter));
		console.log('new', newItem);
		if (activeList.length > 0 && activeList.findIndex(item => item.name = newItem[0].name) === -1) {
			setListFinal(listFinal => [...listFinal, ...newItem]);
			console.log(listFinal);
		}
	};
	
	const list = activeList.filter(item => item.name.match(filter))
		.map((item, i) => {
			return (
				<li key={i}>
					{item.name.toUpperCase()}
					<button onClick={
						(e) => {
							addItemToStateStorage(item.name);
							// setListFinal(list => [...list, item]);
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