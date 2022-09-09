import "./App.css";
import Header from "./components/Header/header";
import FoodList from "./components/food-list/FoodList";
import {database} from "./database/db";
import {stashDataSession, stashDataStorage} from "./services/localStorageDB";
import PackageList from "./components/package-list/PackageList";
import {useEffect, useState} from "react";
import SearchProducts from "./components/search-product/SearchProducts";


function App() {
    if (!localStorage.getItem("products")) {
        stashDataStorage("products", database.products);
    }
    
    // перенос логики из Foodlist
    const [productList, setProductList] = useState(JSON.parse(localStorage.getItem("products")));
    const [amount, setAmount] = useState(0);
    console.log(productList);
    
    const changeAmount = (e, property) => {
        setAmount(amount => (parseInt(e.target.value)));
        let indexOfChangedItem = productList.findIndex(item => item.name === e.target.name);
        const newItem = [...productList].filter(item => item.name === e.target.name);
        newItem[0] = {...newItem[0], [property]: e.target.value};
        
        const oldItemsBefore = [...productList].filter((item, i) => i < indexOfChangedItem);
        const oldItemsAfter = [...productList].filter((item, i) => i > indexOfChangedItem);
        
        setProductList(list => [...oldItemsBefore, newItem[0], ...oldItemsAfter]);
        // stashDataSession("products", productList);
        return [...oldItemsBefore, newItem[0], ...oldItemsAfter];
    };
    
    const clearAmount = (arr) => {
        setProductList(() => arr.map(item => ({...item, amount: 0})));
        setAmount(0);
        // stashDataSession("products", productList);
    };
    
    const deleteItem = (e) => {
        const newArr = productList.filter(item => item.name !== e.target.name);
        setProductList(productList => newArr);
        // stashDataSession("products", newArr);
    };
    
    const deleteItemFromStorage = (e) => {
        const newArr = productList.filter(item => item.name !== e.target.name);
        setProductList(productList => newArr);
        // stashDataSession("products", newArr);
        stashDataStorage("products", newArr);
    };
    
    
    console.log('render App')
    return (
        <div className="App">
            <Header/>
            <div className={"main-container"}>
                <FoodList productList={productList}
                          amount={amount}
                          setProductList={setProductList}
                          setAmount={setAmount}
                          changeAmount={changeAmount}
                          clearAmount={clearAmount}
                          deleteItem={deleteItem}
                          deleteItemFromStorage={deleteItemFromStorage}
                />
                <PackageList/>
            </div>
            
        </div>
    );
}

export default App;
