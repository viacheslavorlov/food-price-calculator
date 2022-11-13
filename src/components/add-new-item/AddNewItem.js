import "./AddNewItem.css";

import React, {useState} from "react";
import {stashDataSession, stashDataStorage} from "../../services/localStorageDB";
import {useDispatch, useSelector} from "react-redux";
import {addNewIngredient} from "../../reducers/productsReducer";
import {addNewPackage} from "../../reducers/packageReducer";
import {nanoid} from "@reduxjs/toolkit";

const AddNewItem = () => {
	
	const [type, setType] = useState('');
	const [newItem, setNewItem] = useState({
		name: '',
		metric: '',
		price: '',
		pack: '',
		amount: '',
		id: ''
	});
	const dispatch = useDispatch();
	
	const {products} = useSelector(state => state.products);
	const {packages} = useSelector(state => state.package);
	
	const setNewItemValue = (e) => {
		if (e.target.value >= 0 || e.target.value) {
			setNewItem(newItem => ({
				...newItem,
				[e.target.name]: e.target.value,
				id: nanoid()
			}));
		}
	}
	
	const addItemToProductList =  (e) => {
		e.preventDefault();
		if(newItem.name !== '' && newItem.pack !== 0 && newItem.price !== 0 && newItem.metric !== '') {
			if (type === 'products') {
				const oldList = [...products];
				if (products.findIndex(item => item.name === newItem.name) > -1) {
					alert('Такой продукт уже существует в списке!');
					setNewItem({name: '', metric: '', price: '', pack: '', amount: '', id: ''});
				} else {
					dispatch(addNewIngredient(newItem));
					alert(`Добавлен новый продукт: ${newItem.name}`);
					stashDataStorage('products', [...oldList, newItem]);
					setNewItem({name: '', metric: '', price: '', pack: '', amount: '', id: ''});
				}
			} else if (type === 'packages') {
				const oldList = [...packages];
				if (packages.findIndex(item => item.name === newItem.name) > -1) {
					alert('Такой продукт уже существует в списке!');
					setNewItem({name: '', metric: '', price: '', pack: '', amount: '', id: ''});
				} else {
					dispatch(addNewPackage(newItem));
					alert(`Добавлен новый продукт: ${newItem.name}`);
					stashDataStorage('package', [...oldList, newItem]);
					setNewItem({name: '', metric: '', price: '', pack: '', amount: '', id: ''});
				}
			} else {
				alert('Выберите тип добавляемого: продукт/ингредиент');
			}
			
		}
	}
	
	
	return (
		<div className={"add-new-item"}>
			<h2 className={"add-new-item__header"}>Добавить новый продукт:</h2>
			<form className={"add-new-item__form"}>
				<div>
					<label htmlFor="type">Продукт или упаковка: </label>
					<label>Продукт
					<input onChange={(e)=> setType(e.target.value)} type="radio" name="type" id="product" value="products"/></label>
					<label>Упаковка
					<input onChange={(e)=> setType(e.target.value)} type="radio" name="type" id="package" value="packages"/></label>
				</div>
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
				<button className={"add-new-item__form__button"} onClick={(e) => addItemToProductList(e)}>Добавить продукт</button>
			</form>
		</div>
	);
};

export default AddNewItem;