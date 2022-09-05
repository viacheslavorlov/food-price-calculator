import "./FoodList.css";
import {useEffect, useState} from "react";
import {stashDataSession, stashDataStorage} from "../../services/localStorageDB";
import ListElement from "../list-item/ListItem";
import AddNewItem from "../add-new-item/AddNewItem";

const FoodList = ({data}) => {
	const [productList, setProductList] = useState(JSON
		.parse(localStorage.getItem("products")) || data);
	const [amount, setAmount] = useState(0);
	
	// const setAmountValue = (e) => {
	//
	// };
	
	const changeAmount = (e, property) => {
		setAmount(amount => e.target.value);
		let indexOfChangedItem = productList.findIndex(item => item.name === e.target.name);
		const newItem = [...productList].filter(item => item.name === e.target.name);
		newItem[0] = {...newItem[0], [property]: e.target.value};
		
		const oldItemsBefore = [...productList].filter((item, i) => i < indexOfChangedItem);
		const oldItemsAfter = [...productList].filter((item, i) => i > indexOfChangedItem);
		
		setProductList(list => [...oldItemsBefore, newItem[0], ...oldItemsAfter]);
		stashDataSession(JSON.stringify(productList));
	};
	
	const clearAmount = (arr) => {
		setProductList(() => arr.map(item => ({...item, amount: 0})));
		setAmount(0);
		stashDataSession(JSON.stringify(productList));
	};
	
	const deleteItem = (e) => {
		const newArr = productList.filter(item => item.name !== e.target.name);
		setProductList(() => newArr);
		stashDataSession(JSON.stringify(newArr));
	};
	
	const deleteItemFromStorage = (e) => {
		deleteItem(e);
		stashDataStorage(JSON.stringify(productList));
	};
	
	useEffect(() => {
		stashDataSession(JSON.stringify(productList));
	}, []);
	
	const calculatePriceOfProduct = (price, amount, pack) => {
		return Math.ceil(price * (amount / pack));
	};
	
	const list = productList.map((item, index) => {
		return <ListElement key={index}
		                    changeAmount={changeAmount}
		                    item={item} index={index}
		                    calulatePriceOfProduct={calculatePriceOfProduct}
		                    deleteItem={deleteItem}
		                    deleteItemFromStorage={deleteItemFromStorage}
		                    />;
	});
	
	return (
		<>
			<AddNewItem setProductList={setProductList}/>
			<div className="product_list">
				<h2 className="product_list__heading">Список продуктов</h2>
				<ul className="product_list__elements">
					{list}
				</ul>
				<div>
					<h3>Общая стоимость использованных продуктов:<span className="span">_</span> <u>
						{productList
							.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount, b.pack), 0)}
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

