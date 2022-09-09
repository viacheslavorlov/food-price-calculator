import "./AddNewItem.css";

import React, {useEffect, useState} from "react";
import {stashDataStorage} from "../../services/localStorageDB";

const AddNewItem = ({setProductList, productList}) => {
	const [newItem, setNewItem] = useState({
		name: '',
		metric: '',
		price: '',
		pack: '',
		amount: ''
	});
	
	const setNewItemValue = (e) => {
		if (e.target.value >= 0 || e.target.value) {
			setNewItem(newItem => ({
				...newItem, [e.target.name]: e.target.value
			}));
		}
	}
	
	const addItemToLocalStorage =  (e) => {
		e.preventDefault();
		if(newItem.name !== '' && newItem.pack !== 0 && newItem.price !== 0 && newItem.metric !== '') {
			const oldList = [...productList];
			
			if (productList.findIndex(item => item.name === newItem.name) > -1) {
				alert('Такой продукт уже существует в списке!');
				setNewItem({name: '', metric: '', price: '', pack: '', amount: ''});
				return;
			} else {
				setProductList(() => [...productList, newItem]);
				alert(`Добавлен новый продукт: ${newItem.name}`);
				stashDataStorage("products", [...oldList, newItem]);
				setNewItem({name: '', metric: '', price: '', pack: '', amount: ''});
			}
			
			
		}
	}
	
	useEffect(() => {
	
	}, [newItem])
	
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
					<input type="number" value={newItem.pack} name="pack" min={1} onChange={(e) => setNewItemValue(e)}/>
				</div>
				
				<div  className={"add-new-item__form__item"}>Цена за пачку: <br/>
					<input type="number" value={newItem.price} name="price"  min={1} onChange={(e) => setNewItemValue(e)}/>
				</div>
				
				<br/>
				<br/>
				<button className={"add-new-item__form__button"} onClick={addItemToLocalStorage}>Добавить продукт</button>
			</form>
		</div>
	);
};

export default AddNewItem;