import React, {useEffect} from "react";
import {stashDataSession} from "../../../services/localStorageDB";
import "./PackageList.css";
import {useDispatch, useSelector} from "react-redux";
import {addNewActiveList, deleteFromActiveList} from "../../../reducers/packageReducer";
import ListElement from "../../list-item/ListItem";
import ErrorBoundaries from "../../error-boundaries/ErrorBoundaries";
import SearchPackages from "./SearchPackages";
import {finalPrice} from "../../../services/utils";

const PackageList = () => {
	const {packages, activePackage} = useSelector((state) => state.package);
	const dispatch = useDispatch();
	// console.log('products', activePackage, packages);
	
	
	const changeAmount = (e, property) => {
		if (activePackage.length) {
			let indexOfChangedItem = activePackage.findIndex(item => item.name === e.target.name);
			let newItem = [...activePackage].filter(item => item.name === e.target.name);
			const newItemElement = {...newItem[0], [property]: parseInt(e.target.value)};
			console.log("new item", newItemElement);
			
			const oldItemsBefore = [...activePackage].filter((item, i) => i < indexOfChangedItem);
			console.log("before", oldItemsBefore);
			const oldItemsAfter = [...activePackage].filter((item, i) => i > indexOfChangedItem);
			console.log("after", oldItemsAfter);
			
			dispatch(addNewActiveList([...oldItemsBefore, newItemElement, ...oldItemsAfter]));
		
		}
	};
	
	const clearAmount = (arr) => {
		const clearedList = arr.map(item => ({...item, amount: 0}));
		// setAmount(amount => 0);
		dispatch(addNewActiveList(clearedList))
		stashDataSession("activePackage", clearedList);
	};
	
	const deleteItem = (id) => {
		dispatch(deleteFromActiveList(id))
	};
	
	
	const listFormation = () => {
		let result;
		if (activePackage.length > 0) {
			result = activePackage.map((item, index) => {
				return <ListElement key={index}
				                    changeAmount={changeAmount}
				                    item={item}
				                    deleteItem={deleteItem}
				/>;
			});
		} else {
			result = <div>'Нет выбранных продуктов'</div>;
		}
		return result;
	};
	
	const listOfProducts = listFormation();
	const totalPrice = finalPrice(activePackage)
	
	
	useEffect(() => {
		listFormation();
	}, [activePackage, packages]);
	
	
	return (
		<>
			<div className="product_list">
				<SearchPackages buttonName={"Добавить"}
								type={"packages"}
								deleteOrAdd={"add"}/>
				<h2 className="product_list__heading">Список продуктов</h2>
				<ErrorBoundaries>
					<div className="product_list__elements">
						{listOfProducts.length ? listOfProducts : <div>Не выбраны продукты</div>}
					</div>
				</ErrorBoundaries>
				<div>
					<h3>Общая стоимость использованных продуктов:<span className="span">_</span> <u>
						{totalPrice ? totalPrice.toFixed(2) : 'Введите числовые данные!'}
					</u>
					</h3>
					<button>Сохранить стоимость ингредиентов</button>
					<button onClick={() => clearAmount(activePackage)}>Очистить количество ингридиентов</button>
				</div>
			</div>
		</>
	);
};

export default PackageList;
