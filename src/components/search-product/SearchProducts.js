import "./SearchProducts.css";

import React, {useEffect, useState} from "react";


import ErrorBoundary from "../error-boundaries/ErrorBoundaries";
import {stashDataSession} from "../../services/localStorageDB";

const SearchProducts = ({productList, setProductList, listFinal, setListFinal}) => {
	const [filter, setFilter] = useState("");
	const [activeList, setActiveList] = useState([...productList]);
	const [filteredList, setFilteredList] = useState([]);
	
	const filterFunction = (list, str) => {
		if (str.trim()) {
			setFilteredList(list.filter(item => item.name.includes(str)));
		}
		else setFilteredList(list);
	};
	useEffect(() => {
		filterFunction(activeList, filter)
	}, [activeList, filter, productList]);
	
	
	const addItemToFinalLIst = (filter) => {
		const newItem = [...productList].filter(item => item.name.toLowerCase() === filter.toLowerCase());
		setListFinal(listFinal => [...listFinal, ...newItem]);
		setFilter('');
		
};
const deleteItemFromActiveList = (name) => {
	const newArr = activeList.filter(item => item.name !== name);
	setActiveList(activeList => newArr);
};


const list = filteredList.map((el, i) => {
		return (
			<div key={i}>
				{el.name.toUpperCase()}
				<button onClick={
					(e) => {
						addItemToFinalLIst(el.name.toLowerCase());
						deleteItemFromActiveList(el.name)
					}
				}
				>Добавить
				</button>
			</div>
		);
	});
const content = list || <h1>нет выбранных продуктов</h1>;

useEffect(() => {
	setActiveList([...productList]);
}, [productList]);

// useEffect(() => {
// 	listFormation();
// }, [listFinal])

return (
	<div>
		<input type="search" placeholder="Название продукта" value={filter}
		       onChange={(e) => setFilter(e.target.value)}/>
		<ErrorBoundary>
			{content}
		</ErrorBoundary>
	</div>
);
}
;


const ActiveListElement = (item, i, addItemToStateStorage) => {
	return (
		<div>
			{item.name.toUpperCase()}
			<button onClick={
				(e) => {
					addItemToStateStorage(item.name);
					e.target.parentElement.remove();
				}
			}
			>Добавить
			</button>
		</div>
	);
};


export default SearchProducts;