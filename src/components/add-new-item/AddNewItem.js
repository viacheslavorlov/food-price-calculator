import React, {useState} from "react";
import {stashDataSession, stashDataStorage} from "../../services/localStorageDB";

const AddNewItem = ({setProductList}) => {
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
			if (oldList.findIndex(item => item.name === newItem.name) !== -1) {
				alert('Такой продукт уже существует в списке!');
				setNewItem({name: '', metric: '', price: 0, pack: 0, amount: 0});
				return;
			}
			oldList.push(newItem);
			setProductList(oldList);
			stashDataSession(JSON.stringify(oldList));
			stashDataStorage(JSON.stringify(oldList));
			alert(`Добавлен новый продукт: ${newItem.name}`);
			setNewItem({name: '', metric: '', price: 0, pack: 0, amount: 0});
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