import "./FoodList.css";
import {useEffect, useState} from "react";
import {stashDataSession, stashDataStorage} from "../../services/localStorageDB";
import ListElement from "../list-item/ListItem";
import AddNewItem from "../add-new-item/AddNewItem";
import SearchProducts from "../search-product/SearchProducts";
import ErrorBoundaries from "../error-boundaries/ErrorBoundaries";

const FoodList = ({productList, setProductList}) => {
	
	const [listFinal, setListFinal] = useState([]);
	const [list, setList] = useState(JSON.parse(sessionStorage.getItem("products")) || []);
	const [amount, setAmount] = useState(0);
	
	const changeAmount = (e, property) => {
		setAmount(amount => parseInt(e.target.value));
		let indexOfChangedItem = list.findIndex(item => item.name === e.target.name);
		let newItem = [...list].filter(item => item.name === e.target.name);
		const newItemElement = {...newItem[0], [property]: parseInt(e.target.value)};
		console.log("new item", newItemElement);
		
		const oldItemsBefore = [...list].filter((item, i) => i < indexOfChangedItem);
		console.log("before", oldItemsBefore);
		const oldItemsAfter = [...list].filter((item, i) => i > indexOfChangedItem);
		console.log("after", oldItemsAfter);
		
		setList(list => [...oldItemsBefore, newItemElement, ...oldItemsAfter]);
		stashDataSession("products", list);
	};
	
	const clearAmount = (arr) => {
		setList((list) => arr.map(item => ({...item, amount: 0})));
		setAmount(amount => 0);
		// stashDataSession("products", productList);
	};
	
	const deleteItem = (e, name) => {
		const newArr = list.filter(item => item.name !== name);
		setList(productList => newArr);
		// stashDataSession("products", newArr);
	};
	
	const deleteItemFromStorage = (e, name) => {
		// const newArrProduct = list.filter(item => item.name !== name);
		// setList(productList => newArrProduct);
		const newArr = productList.filter(item => item.name !== name);
		setProductList(productList => newArr);
		stashDataStorage("products", newArr);
	};
	
	
	const calculatePriceOfProduct = (price, amount, pack) => {
		return Math.ceil(price * (amount / pack));
	};
	
	const listFormation = () => {
		let result;
		if (list.length > 0) {
			result = list.map((item, index) => {
				return <ListElement key={index}
				                    changeAmount={changeAmount}
				                    item={item} index={index}
				                    calulatePriceOfProduct={calculatePriceOfProduct}
				                    deleteItem={deleteItem}
				                    // deleteItemFromStorage={deleteItemFromStorage}
				/>;
			});
		} else {
			result = <li>'Нет выбранных продуктов'</li>;
		}
		return result;
	};
	
	console.log("parced productlist", productList);
	console.log("list", list);
	const listOfProducts = listFormation();
	const finalPrice = list.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount, b.pack), 0);
	// useEffect(() => {
	// 	changeAmount()
	// }, [amount])
	
	// useEffect(() => {
	// 	setList(listFinal);
	// }, []);
	
	useEffect(() => {
		setList(listFinal);
	}, [listFinal, productList]);
	
	return (
		<>
			<div className="product_list">
				<SearchProducts setProductList={setProductList} productList={productList} listFinal={listFinal}
				                setListFinal={setListFinal}/>
				<h2 className="product_list__heading">Список продуктов</h2>
				<ErrorBoundaries>
					<ul className="product_list__elements">
						{listOfProducts ? listOfProducts : <li>Не выбраны продукты</li>}
					</ul>
				</ErrorBoundaries>
				<div>
					<h3>Общая стоимость использованных продуктов:<span className="span">_</span> <u>
						{finalPrice}
					</u>
					</h3>
					<button>Сохранить стоимость ингредиентов</button>
					<button onClick={() => clearAmount(productList)}>Очистить количество ингридиентов</button>
				</div>
			</div>
		</>
	);
};

export default FoodList;

