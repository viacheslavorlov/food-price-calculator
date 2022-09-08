import React, {useState} from "react";
import {stashDataSession} from "../../services/localStorageDB";

const SearchProducts = ({productList, setProductList, listFinal, setListFinal}) => {
	const [filter, setFilter] = useState('');
	const [activeList, setActiveList] = useState([]);
	
	const addItemToSessionStorage = (filter) => {
		const newItem = JSON.parse(localStorage.getItem("products"))
			.filter(item => item.name === filter);
		console.log('new', newItem);
		setActiveList(activeList => [...activeList, ...newItem]);
		if (sessionStorage.getItem("products")) {
			const oldList = JSON.parse(sessionStorage.getItem("products"));
			console.log('old', oldList);
			sessionStorage.setItem("products", JSON.stringify([...oldList, ...newItem]));
			console.log('search if', productList);
			setProductList(() => JSON.parse(sessionStorage.getItem("products")));
		} else {
			stashDataSession("products", newItem);
			setProductList(() => JSON.parse(sessionStorage.getItem("products")));
			console.log('search else', productList);
		}
	};
	
	const list = productList.filter(item => item.name.match(filter))
		.map((item, i) => {
			return (
				<li key={i}>
					{item.name.toUpperCase()}
					<button onClick={
						(e) => {
							addItemToSessionStorage(item.name);
							setListFinal(list=> [...list, item])
							e.target.parentElement.remove();
						}
					}
					>Добавить</button>
				</li>
			);
		});
	
	
	
	return (
		<div>
			<input type="search" placeholder="Название продукта" value={filter}
			       onChange={(e) => setFilter(e.target.value)}/>
			<ul>
				{list}
			</ul>
		</div>
	);
};

export default SearchProducts;