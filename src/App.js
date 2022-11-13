import "./App.css";
import Header from "./components/Header/header";
import FoodList from "./components/food-list/FoodList";
import database from './db.json'
import {stashDataStorage} from "./services/localStorageDB";
import PackageList from "./components/package-list/PackageList";
import AddNewItem from "./components/add-new-item/AddNewItem";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";


function App() {
	if (localStorage.getItem("package") === null) {
		stashDataStorage("package", database.packages);
	}
	if (localStorage.getItem("products") === null) {
		stashDataStorage("products", database.ingredients);
	}
	
	console.log("render App");
	
	return (
		<Provider store={store}>
			<div className="App">
				<BrowserRouter>
					<Header/>
					<div className={"main-container"}>
						<Routes>
							<Route path="new-item"
							       element={<AddNewItem/>}/>
							<Route path="/"
							       element={<FoodList/>}/>
							<Route path="package" element={<PackageList/>}/>
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		</Provider>
	);
}

export default App;
