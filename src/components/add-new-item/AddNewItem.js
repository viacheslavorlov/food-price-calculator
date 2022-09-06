import "./AddNewItem.css";

import React, {useState} from "react";
import {stashDataSession, stashDataStorage} from "../../services/localStorageDB";

const AddNewItem = ({setProductList}) => {
	const [newItem, setNewItem] = useState({
		name: '',
		metric: '',
		price: '',
		pack: '',
		amount: ''
	});
	
	const setNewItemValue = (e) => {
			setNewItem(newItem => ({
				...newItem, [e.target.name]: e.target.value
			}));
	}
	
	const addItemToLocalStorage = async (e) => {
		e.preventDefault();
		if(newItem.name !== '' && newItem.pack !== 0 && newItem.price !== 0 && newItem.metric !== '') {
			const oldList = await JSON.parse(localStorage.getItem('products'));
			const oldListSession = JSON.parse(sessionStorage.getItem('products'));
			if (oldList.findIndex(item => item.name === newItem.name) > -1) {
				alert('Такой продукт уже существует в памяти!');
				if (oldListSession.findIndex(item => item.name === newItem.name) === -1) {
					oldListSession.push(newItem);
					setProductList(oldListSession);
					stashDataSession("products", oldListSession);
					setNewItem({name: '', metric: '', price: '', pack: '', amount: ''});
				}
				return;
			}
			
			if (oldListSession.findIndex(item => item.name === newItem.name) > -1) {
				alert('Такой продукт уже существует в списке!');
				
				return;
			}
			
			oldList.push(newItem);
			oldListSession.push(newItem);
			setProductList(oldListSession);
			stashDataSession("products", oldListSession);
			stashDataStorage("products", oldList);
			alert(`Добавлен новый продукт: ${newItem.name}`);
			setNewItem({name: '', metric: '', price: '', pack: '', amount: ''});
		}
	}
	
	return (
		<div className={"add-new-item"}>
			<h2 className={"add-new-item__header"}>Добавить новый продукт:</h2>
			<form className={"add-new-item__form"}>
				<div className={"add-new-item__form__item"}>Название продукта: <br/>
					<input type="text" value={newItem.name} name="name" onChange={(e) => setNewItemValue(e)}/>
				</div>
				
				<div className={"add-new-item__form__item"}>Единицы измерения: <br/>
					<input type="text" value={newItem.metric} name="metric" onChange={(e) => setNewItemValue(e)}/>
				</div>
				
				<div  className={"add-new-item__form__item"}>Количество в одной пачке: <br/>
					<input type="number" value={newItem.pack} name="pack" onChange={(e) => setNewItemValue(e)}/>
				</div>
				
				<div  className={"add-new-item__form__item"}>Цена за пачку: <br/>
					<input type="number" value={newItem.price} name="price" onChange={(e) => setNewItemValue(e)}/>
				</div>
				
				<br/>
				<br/>
				<button className={"add-new-item__form__button"} onClick={addItemToLocalStorage}>Добавить продукт</button>
			</form>
		</div>
	);
};

export default AddNewItem;