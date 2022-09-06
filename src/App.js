import "./App.css";
import Header from "./components/Header/header";
import FoodList from "./components/food-list/FoodList";
import {database} from "./database/db";
import {stashDataStorage} from "./services/localStorageDB";
import PackageList from "./components/package-list/PackageList";


function App() {
    if (!sessionStorage.getItem("products") || !localStorage.getItem("products")) {
        stashDataStorage("products", database.products);
    }
    console.log('render App')
    return (
        <div className="App">
            <Header/>
            <div className={"main-container"}>
                <FoodList data={database.products}/>
                <PackageList/>
            </div>
            
        </div>
    );
}

export default App;
