import "./App.css";
import Header from "./components/Header/header";
import FoodList from "./components/food-list/FoodList";
import {database} from "./database/db";
import {stashDataStorage} from "./services/localStorageDB";
import PackageList from "./components/package-list/PackageList";
import {useEffect, useState} from "react";
import AddNewItem from "./components/add-new-item/AddNewItem";



function App() {
	if (!localStorage.getItem("products")) {
		stashDataStorage("products", database.products);
	}
	const [productList, setProductList] = useState(JSON.parse(localStorage.getItem("products")));
	
	console.log("render App");
	
	useEffect(() => {
		stashDataStorage("products", productList);
	}, [productList]);
	
	return (
		<div className="App">
			<Header/>
			<div className={"main-container"}>
				<AddNewItem setProductList={setProductList} productList={productList}/>
				<FoodList setProductList={setProductList} productList={productList}/>
				<PackageList/>
			</div>
		
		</div>
	);
}

export default App;
