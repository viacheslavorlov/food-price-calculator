import "./App.css";
import Header from "./components/Header/header";
import FoodList from "./components/food-list/FoodList";
import {database} from "./database/db";
import {stashDataStorage} from "./services/localStorageDB";
import PackageList from "./components/package-list/PackageList";
import {useEffect, useState} from "react";
import AddNewItem from "./components/add-new-item/AddNewItem";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";


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
			<Provider store={store}>
				<BrowserRouter>
					<Header/>
					<div className={"main-container"}>
						<Routes>
							<Route path="new-item"
							       element={<AddNewItem setProductList={setProductList} productList={productList}/>}/>
							<Route path="/"
							       element={<FoodList setProductList={setProductList} productList={productList}/>}/>
							<Route path="package" element={<PackageList/>}/>
						</Routes>
					</div>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
