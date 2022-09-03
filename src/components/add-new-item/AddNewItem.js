import React, {useState} from "react";
import {stashData} from "../../services/localStorageDB";

const AddNewItem = () => {
	const [newItem, setNewItem] = useState({
		name: '',
		metric: '',
		price: 0,
		pack: 0,
		amount: 0
	});
	
	const setNewItemValue = (e) => {
		setNewItem(newItem => ({
		...newItem, [e.target.name]: e.target.value
		}));
	}
	
	const addItemToLocalStorage = (e) => {
		e.preventDefault();
		if(newItem.name !== '' && newItem.pack !== 0 && newItem.price !== 0 && newItem.metric !== '') {
			const oldList = JSON.parse(localStorage.getItem('products'));
			// console.log(oldList);
			oldList.push(newItem);
			stashData(JSON.stringify(oldList));
		}
	}
	
	return (
		<div>
			<h2>Добавить новый продукт:</h2>
			<form>
				<div>Название продукта:</div>
				<input type="text" value={newItem.name} name="name" onChange={(e) => setNewItemValue(e)}/>
				<div>Единицы измерения:</div>
				<input type="text" value={newItem.metric} name="metric" onChange={(e) => setNewItemValue(e)}/>
				<div>Количество в одной пачке:</div>
				<input type="number" value={newItem.pack} name="pack" onChange={(e) => setNewItemValue(e)}/>
				<div>Цена за пачку:</div>
				<input type="number" value={newItem.price} name="price" onChange={(e) => setNewItemValue(e)}/>
				<br/>
				<br/>
				<button onClick={addItemToLocalStorage}>Добавить продукт</button>
			</form>
		</div>
	);
};

export default AddNewItem;