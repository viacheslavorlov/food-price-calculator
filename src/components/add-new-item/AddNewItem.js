import "./AddNewItem.css";

import React, {useState} from "react";
import {stashDataStorage} from "../../services/localStorageDB";
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
	
	const addItemToProductList =  (e, obj) => {
		e.preventDefault();
		if(obj.name !== '' && obj.pack !== 0 && obj.price !== 0 && obj.metric !== '') {
			if (type === 'products') {
				const oldList = [...products];
				if (oldList.findIndex(item => item.name === obj.name) > -1) {
					alert('Такой продукт уже существует в списке!');
					setNewItem({name: '', metric: '', price: '', pack: '', amount: '', id: ''});
					return;
				} else {
					dispatch(addNewIngredient(obj));
					alert(`Добавлен новый продукт: ${obj.name}`);
					stashDataStorage('products', [...oldList, obj]);
					setNewItem({name: '', metric: '', price: '', pack: '', amount: '', id: ''});
					return;
				}
			} else if (type === 'packages') {
				const oldList = [...packages];
				if (packages.findIndex(item => item.name === obj.name) > -1) {
					alert('Такой продукт уже существует в списке!');
					setNewItem({name: '', metric: '', price: '', pack: '', amount: '', id: ''});
					return;
				} else {
					dispatch(addNewPackage(obj));
					alert(`Добавлен новый продукт: ${obj.name}`);
					stashDataStorage('package', [...oldList, obj]);
					setNewItem({name: '', metric: '', price: '', pack: '', amount: '', id: ''});
					return;
				}
			} else {
				alert('Выберите тип добавляемого: продукт/ингредиент');
			}
			
		}
	}
	
	return (
		<div className={"add-new-item"}>
			<h2 className={"add-new-item__header"}>Добавить новый продукт/упаковку:</h2>
			<form className={"add-new-item__form"}>
				<div className={"add-new-item__form__item"}>
					<div>Продукт или упаковка: </div>
					<label>Продукт
					<input required onChange={(e)=> setType(e.target.value)} type="radio" name="type" id="product" value="products"/></label>
					<label>Упаковка
					<input required onChange={(e)=> setType(e.target.value)} type="radio" name="type" id="package" value="packages"/></label>
				</div>
				<div className={"add-new-item__form__item"}>Название продукта: <br/>
					<input required type="text" value={newItem.name} name="name" onChange={(e) => setNewItemValue(e)}/>
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
				<button className={"add-new-item__form__button"} onClick={(e) => addItemToProductList(e, newItem)}>Добавить продукт</button>
			</form>
		</div>
	);
};

export default AddNewItem;