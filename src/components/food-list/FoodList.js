import "./FoodList.css";
import {useEffect} from "react";
import {stashDataSession} from "../../services/localStorageDB";
import ListElement from "../list-item/ListItem";
import SearchProducts from "../search-product/SearchProducts";
import {useDispatch, useSelector} from "react-redux";
import {addNewActiveList, addToFilteredList, deleteFromActiveList} from "../../reducers/productsReducer";
import Recipes from "./Recipes";
import {finalPrice} from "../../services/utils";
import AddRecipes from "./AddRecipes";

const FoodList = () => {
	const {activeProducts, filteredProducts} = useSelector((state) => state.products);
	const dispatch = useDispatch();
	console.log("products", activeProducts);
	
	const changeAmount = (e, property) => {
		if (activeProducts.length) {
			let indexOfChangedItem = activeProducts.findIndex(item => item.name === e.target.name);
			let newItem = [...activeProducts].filter(item => item.name === e.target.name);
			const newItemElement = {...newItem[0], [property]: parseFloat(e.target.value)};
			
			const oldItemsBefore = [...activeProducts].filter((item, i) => i < indexOfChangedItem);
			
			const oldItemsAfter = [...activeProducts].filter((item, i) => i > indexOfChangedItem);
			
			
			dispatch(addNewActiveList([...oldItemsBefore, newItemElement, ...oldItemsAfter]));
			
		}
	};
	
	const clearAmount = (arr) => {
		const clearedList = arr.map(item => ({...item, amount: 0}));
		// setAmount(amount => 0);
		dispatch(addNewActiveList(clearedList));
		stashDataSession("activeProducts", clearedList);
	};
	
	const deleteItem = (id) => {
		dispatch(deleteFromActiveList(id));
		dispatch(addToFilteredList(activeProducts.filter(item => item.id === id)[0]));
	};
	
	const listFormation = () => {
		let result;
		if (activeProducts.length > 0) {
			result = activeProducts.map((item, index) => {
				return <ListElement key={index}
				                    changeAmount={changeAmount}
				                    item={item} index={index}
				                    deleteItem={deleteItem}
				/>;
			});
		} else {
			result = <div>'Нет выбранных продуктов'</div>;
		}
		return result;
	};
	
	const listOfProducts = listFormation();
	
	useEffect(() => {
		listFormation();
	}, [activeProducts, filteredProducts]);
	
	return (
		<>
			<div className="product_list">
				<Recipes/>
				<hr/>
				<SearchProducts/>
				<h2 className="product_list__heading">Список продуктов</h2>
					<div className="product_list__elements">
						{listOfProducts.length ? listOfProducts : <div>Не выбраны продукты</div>}
					</div>
				<div>
					<h2>Общая стоимость использованных продуктов:<span className="span">_</span>
						{Number.isNaN(finalPrice(activeProducts)) ?
							"Введите числовые данные!" : finalPrice(activeProducts).toFixed(2)}
					</h2>
					<button
						className="delete__button"
						onClick={() => clearAmount(activeProducts)}>Очистить количество ингридиентов
					</button>
					<br/>
					<br/>
					<AddRecipes/>
				</div>
			</div>
		</>
	);
};

export default FoodList;

