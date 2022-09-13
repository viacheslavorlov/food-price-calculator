import "./SearchProducts.css"

import React, {useEffect, useState} from "react";


import ErrorBoundary from "../error-boundaries/ErrorBoundaries";
import {stashDataSession} from "../../services/localStorageDB";

const SearchProducts = ({productList, setProductList, listFinal, setListFinal}) => {
	const [filter, setFilter] = useState("");
	const [activeList, setActiveList] = useState([...productList]);
	
	const addItemToStateStorage = (filter) => {
		const newItem = [...productList].filter(item => item.name === filter);
		setListFinal(() => [...listFinal, ...newItem]);
		console.log("listFinal", listFinal);
		setFilter(() => "");
		const filteredActiveList = activeList.filter(item => listFinal.indexOf(item) === -1);
		setActiveList(activeList => filteredActiveList);
		console.log('filtered', filteredActiveList);
		console.log('filtered active', activeList);
	};
	const deleteItemFromActiveList = (e, name) => {
		const newArr = activeList.filter(item => item.name !== name);
		setActiveList(activeList => newArr);
	}
	
	
	
	const list = activeList.filter(item => item.name.match(filter))
		.map((item, i) => {
			return (
				<div key={i}>
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
		});
	
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
					{list}
				</ErrorBoundary>
		</div>
	);
};




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