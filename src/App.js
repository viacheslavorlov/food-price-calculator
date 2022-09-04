import "./App.css";
import Header from "./Header/header";
import FoodList from "./components/food-list/FoodList";
import {database} from "./database/db";


function App() {
    
    console.log('render App')
    return (
        <div className="App">
            <Header/>
            <FoodList data={database.products}/>
        </div>
    );
}

export default App;
