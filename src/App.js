import "./App.css";
import Header from "./Header/header";
import FoodList from "./components/food-list/FoodList";
import {database} from "./database/db";
import AddNewItem from "./components/add-new-item/AddNewItem";


function App() {
    console.log('render App')
    return (
        <div className="App">
            <Header/>
            <AddNewItem/>
            <FoodList data={database.products}/>
        </div>
    );
}

export default App;
