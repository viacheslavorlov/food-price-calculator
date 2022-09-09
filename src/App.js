import "./App.css";
import Header from "./components/Header/header";
import FoodList from "./components/food-list/FoodList";
import {database} from "./database/db";
import {stashDataStorage} from "./services/localStorageDB";
import PackageList from "./components/package-list/PackageList";



function App() {
	if (!localStorage.getItem("products")) {
		stashDataStorage("products", database.products);
	}
	
	console.log("render App");
	return (
		<div className="App">
			<Header/>
			<div className={"main-container"}>
				<FoodList/>
				<PackageList/>
			</div>
		
		</div>
	);
}

export default App;
