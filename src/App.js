import Header from "./Header/header";
import FoodList from "./food-list/FoodList";
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
