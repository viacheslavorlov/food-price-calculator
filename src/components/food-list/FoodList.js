import "./FoodList.css";
import {useEffect, useState} from "react";
import {stashDataSession, stashDataStorage} from "../../services/localStorageDB";
import ListElement from "../list-item/ListItem";
import SearchProducts from "../search-product/SearchProducts";
import ErrorBoundaries from "../error-boundaries/ErrorBoundaries";
import {useDispatch, useSelector} from "react-redux";
import {addNewActiveList, deleteFromActiveList} from "../../reducer/reducer";


const FoodList = () => {
	const {activeProducts} = useSelector((state) => state.reducer);
	const dispatch = useDispatch();
	console.log('products', activeProducts);
	const [amount, setAmount] = useState(0);
	
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
		setAmount(amount => 0);
		dispatch(addNewActiveList(clearedList))
		stashDataSession("activeProducts", clearedList);
	};
	
	const deleteItem = (id) => {
		dispatch(deleteFromActiveList(id))
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
				<SearchProducts/>
				<h2 className="product_list__heading">Список продуктов</h2>
				<ErrorBoundaries>
					<div className="product_list__elements">
						{listOfProducts.length ? listOfProducts : <div>Не выбраны продукты</div>}
					</div>
				</ErrorBoundaries>
				<div>
					<h3>Общая стоимость использованных продуктов:<span className="span">_</span> <u>
						{finalPrice}
					</u>
					</h3>
					<button>Сохранить стоимость ингредиентов</button>
					<button onClick={() => clearAmount(activeProducts)}>Очистить количество ингридиентов</button>
				</div>
			</div>
		</>
	);
};

export default FoodList;

