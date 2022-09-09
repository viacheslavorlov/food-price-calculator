import "./FoodList.css";
import {useEffect, useState} from "react";
import {stashDataSession} from "../../services/localStorageDB";
import ListElement from "../list-item/ListItem";
import AddNewItem from "../add-new-item/AddNewItem";
import SearchProducts from "../search-product/SearchProducts";

const FoodList = ({
	                  changeAmount,
	                  amount,
	                  setProductList,
	                  setAmount,
	                  productList,
	                  clearAmount,
	                  deleteItemFromStorage,
	                  deleteItem
                  }) => {
	const [listFinal, setListFinal] = useState([]);
	
	// useEffect(() => {
	// 	stashDataSession("products", productList);
	// }, []);

	// useEffect(() => {
	// 	stashDataSession("products", productList);
	// }, [productList]);
	//
	// useEffect(() => {
	// 	setProductList(list => JSON.parse(sessionStorage.getItem("products")))
	// }, [amount]);
	
	const calculatePriceOfProduct = (price, amount, pack) => {
		return Math.ceil(price * (amount / pack));
	};
	
	const listFormation = () => {
		let result;
		if (listFinal.length > 0) {
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
	const list = listFormation();
	const finalPrice = productList.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount, b.pack), 0);
	// useEffect(() => {
	// 	changeAmount()
	// }, [amount, productList])
	
	return (
		<>
			<AddNewItem setProductList={setProductList} productList={productList}/>
			<div className="product_list">
				<SearchProducts setProductList={setProductList} productList={productList} listFinal={listFinal} setListFinal={setListFinal}/>
				<h2 className="product_list__heading">Список продуктов</h2>
				<ul className="product_list__elements">
					{list}
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

