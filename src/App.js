import "./App.css";
import Header from "./components/Header/header";
import database from './db.json'
import {stashDataStorage} from "./services/localStorageDB";
import PackageList from "./components/pages/package-list/PackageList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import Outcome from "./components/income-outcome/Ouncome";
import Main from "./components/pages/Main";
import AddOns from "./components/pages/AddOns";
import DeleteItems from "./components/delete-items/DeleteItems";


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
							       element={<AddOns/>}/>
							<Route path="/"
							       element={<Main/>}/>
							<Route path="package"
							       element={<PackageList/>}/>
							<Route path={"delete-item"}
							       element={<DeleteItems/>}/>
						</Routes>
						<Outcome/>
					</div>
				</BrowserRouter>
			</div>
		</Provider>
	);
}

export default App;
