import "./App.css";
import Header from "./components/Header/header";
import FoodList from "./components/food-list/FoodList";
import {database} from "./database/db";
import {stashDataStorage} from "./services/localStorageDB";


function App() {
    if (localStorage.getItem("products") === null) {
        stashDataStorage(JSON.stringify(database.products));
    }
    console.log('render App')
    return (
        <div className="App">
            <Header/>
            <FoodList data={database.products}/>
        </div>
    );
}

export default App;
