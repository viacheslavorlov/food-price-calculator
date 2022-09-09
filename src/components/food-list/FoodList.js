import "./FoodList.css";
import {useEffect, useState} from "react";
import {stashDataStorage} from "../../services/localStorageDB";
import ListElement from "../list-item/ListItem";
import AddNewItem from "../add-new-item/AddNewItem";
import SearchProducts from "../search-product/SearchProducts";

const FoodList = () => {
	const [productList, setProductList] = useState(JSON.parse(localStorage.getItem("products")));
	const [listFinal, setListFinal] = useState([]);
	const [list, setList] = useState([]);
	const [amount, setAmount] = useState(0);
	
	const changeAmount = (e, property) => {
		setAmount(amount => (parseInt(e.target.value)));
		let indexOfChangedItem = productList.findIndex(item => item.name === e.target.name);
		const newItem = [...productList].filter(item => item.name === e.target.name);
		newItem[0] = {...newItem[0], [property]: e.target.value};
		
		const oldItemsBefore = [...productList].filter((item, i) => i < indexOfChangedItem);
		const oldItemsAfter = [...productList].filter((item, i) => i > indexOfChangedItem);
		
		setProductList(list => [...oldItemsBefore, newItem[0], ...oldItemsAfter]);
		// stashDataSession("products", productList);
		return [...oldItemsBefore, newItem[0], ...oldItemsAfter];
	};
	
	const clearAmount = (arr) => {
		setProductList(() => arr.map(item => ({...item, amount: 0})));
		setAmount(0);
		// stashDataSession("products", productList);
	};
	
	const deleteItem = (e) => {
		const newArr = productList.filter(item => item.name !== e.target.name);
		setProductList(productList => newArr);
		// stashDataSession("products", newArr);
	};
	
	const deleteItemFromStorage = (e) => {
		const newArr = productList.filter(item => item.name !== e.target.name);
		setProductList(productList => newArr);
		// stashDataSession("products", newArr);
		stashDataStorage("products", newArr);
	};
	
	
	useEffect(() => {
		setList(listFinal);
	}, []);
	
	useEffect(() => {
		setList(listFinal);
	}, [amount, listFinal, productList]);
	
	
	
	
	const calculatePriceOfProduct = (price, amount, pack) => {
		return Math.ceil(price * (amount / pack));
	};
	
	const listFormation = () => {
		let result;
		if (list.length > 0) {
			result = listFinal.map((item, index) => {
				return <ListElement key={index}
				                    changeAmount={changeAmount}
				                    item={item} index={index}
				                    calulatePriceOfProduct={calculatePriceOfProduct}
				                    deleteItem={deleteItem}
				                    deleteItemFromStorage={deleteItemFromStorage}
				/>;
			});
		} else {
			result = <li>'Нет выбранных продуктов'</li>;
		}
		return result;
	};
	
	console.log('parced productlist', productList);
	const listOfProducts = listFormation();
	const finalPrice = productList.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount, b.pack), 0);
	// useEffect(() => {
	// 	changeAmount()
	// }, [amount])
	
	return (
		<>
			<AddNewItem setProductList={setProductList} productList={productList}/>
			<div className="product_list">
				<SearchProducts setProductList={setProductList} productList={productList} listFinal={listFinal} setListFinal={setListFinal}/>
				<h2 className="product_list__heading">Список продуктов</h2>
				<ul className="product_list__elements">
					{listOfProducts}
				</ul>
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

