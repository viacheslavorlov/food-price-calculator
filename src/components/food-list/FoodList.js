import "./FoodList.css";
import {useEffect, useState} from "react";
import {stashDataSession} from "../../services/localStorageDB";
import ListElement from "../list-item/ListItem";
import SearchProducts from "../search-product/SearchProducts";
import ErrorBoundaries from "../error-boundaries/ErrorBoundaries";
import {useDispatch, useSelector} from "react-redux";
import {addNewActiveList, addToFilteredList, deleteFromActiveList, products} from "../../reducers/productsReducer";
import {db} from "../../database/database";
import Recipes from "./Recipes";


const FoodList = () => {
	const [recipe, setRecipe] = useState('');
	const {activeProducts} = useSelector((state) => state.products);
	const dispatch = useDispatch();
	console.log('products', activeProducts);
	// const [amount, setAmount] = useState(0);
	
	// сохранение рецепта
	const saveRecipes = (arr) => {
		db.recipes.add({
			name: recipe,
			date: new Date().toLocaleDateString(),
			components: activeProducts
		})
	}
	
	const changeAmount = (e, property) => {
		// setAmount(amount => parseInt(e.target.value));
		if (activeProducts.length) {
			let indexOfChangedItem = activeProducts.findIndex(item => item.name === e.target.name);
			let newItem = [...activeProducts].filter(item => item.name === e.target.name);
			const newItemElement = {...newItem[0], [property]: parseInt(e.target.value)};
			console.log("new item", newItemElement);

			const oldItemsBefore = [...activeProducts].filter((item, i) => i < indexOfChangedItem);
			console.log("before", oldItemsBefore);
			const oldItemsAfter = [...activeProducts].filter((item, i) => i > indexOfChangedItem);
			console.log("after", oldItemsAfter);

			dispatch(addNewActiveList([...oldItemsBefore, newItemElement, ...oldItemsAfter]));
			// stashDataSession("products", list);
		}
	};
	
	const clearAmount = (arr) => {
		const clearedList = arr.map(item => ({...item, amount: 0}));
		// setAmount(amount => 0);
		dispatch(addNewActiveList(clearedList))
		stashDataSession("activeProducts", clearedList);
	};
	
	const deleteItem = (id) => {
		dispatch(deleteFromActiveList(id))
		dispatch(addToFilteredList(activeProducts.filter(item => item.id === id)[0]))
	};
	
	// const deleteItemFromStorage = (e, name) => {
	// 	// const newArrProduct = list.filter(item => item.name !== name);
	// 	// setList(productList => newArrProduct);
	// 	const newArr = productList.filter(item => item.name !== name);
	// 	setProductList(productList => newArr);
	// 	stashDataStorage("products", newArr);
	// };
	//
	
	const calculatePriceOfProduct = (price, amount, pack) => {
		return Math.ceil(price * (amount / pack));
	};
	
	const listFormation = () => {
		let result;
		if (activeProducts.length > 0) {
			result = activeProducts.map((item, index) => {
				return <ListElement key={index}
				                    changeAmount={changeAmount}
				                    item={item} index={index}
				                    calulatePriceOfProduct={calculatePriceOfProduct}
				                    deleteItem={deleteItem}
					// deleteItemFromStorage={deleteItemFromStorage}
				/>;
			});
		} else {
			result = <div>'Нет выбранных продуктов'</div>;
		}
		return result;
	};
	
	const listOfProducts = listFormation();
	const finalPrice = activeProducts.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount, b.pack), 0);
	// useEffect(() => {
	// 	changeAmount()
	// }, [amount])
	
	useEffect(() => {
		listFormation();
	}, [activeProducts]);
	
	
	
	return (
		<>
			<div className="product_list">
				<Recipes/>
				<hr/>
				<SearchProducts/>
				<h2 className="product_list__heading">Список продуктов</h2>
				<ErrorBoundaries>
					<div className="product_list__elements">
						{listOfProducts.length ? listOfProducts : <div>Не выбраны продукты</div>}
					</div>
				</ErrorBoundaries>
				<div>
					<h3>Общая стоимость использованных продуктов:<span className="span">_</span> <u>
						{Number.isNaN(finalPrice) ?
							'Введите числовые данные!' : finalPrice}
					</u>
					</h3>
					<input
						type="text"
						value={recipe}
						placeholder="Введите название рецепта"
						onChange={(e) => setRecipe(e.target.value)}/>
					<button onClick={() => {
						saveRecipes(activeProducts);
						alert('Рецепт добавлен');
					}}>Сохранить стоимость рецепта</button>
					<button onClick={() => clearAmount(activeProducts)}>Очистить количество ингридиентов</button>
				</div>
			</div>
		</>
	);
};

export default FoodList;

