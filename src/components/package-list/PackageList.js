import React, {useEffect, useState} from "react";
import {database} from "../../database/db";
import {stashDataSession, stashDataStorage} from "../../services/localStorageDB";
import PackageListItem from "../package-list-item/PackageListItem";
import "./PackageList.css";

const PackageList = () => {
	if (localStorage.getItem("package") === null) {
		localStorage.setItem("package", JSON.stringify(database.package));
	}
	const [packageList, setPackageList] = useState(JSON.parse(sessionStorage.getItem("package") || localStorage.getItem("package")));
	const [amount, setAmount] = useState(0);
	
	const changeAmount = (e, property) => {
		setAmount(amount => e.target.value);
		let indexOfChangedItem = packageList.findIndex(item => item.name === e.target.name);
		const newItem = [...packageList].filter(item => item.name === e.target.name);
		newItem[0] = {...newItem[0], [property]: e.target.value};
		
		const oldItemsBefore = [...packageList].filter((item, i) => i < indexOfChangedItem);
		const oldItemsAfter = [...packageList].filter((item, i) => i > indexOfChangedItem);
		
		setPackageList(list => [...oldItemsBefore, newItem[0], ...oldItemsAfter]);
		stashDataSession("package", packageList);
	};
	
	const clearAmount = (arr) => {
		setPackageList(() => arr.map(item => ({...item, amount: 0})));
		setAmount(0);
		stashDataSession("package", packageList);
	};
	
	const deleteItem = (e) => {
		const newArr = packageList.filter(item => item.name !== e.target.name);
		setPackageList(packageList => newArr);
		stashDataSession("package", newArr);
	};
	
	const deleteItemFromStorage = (e) => {
		const newArr = packageList.filter(item => item.name !== e.target.name);
		setPackageList(packageList => newArr);
		stashDataSession("package", newArr);
		stashDataStorage("package", newArr);
	};
	const calculatePriceOfProduct = (price, amount) => {
		return price * amount;
	}
	
	const list = packageList.map((item,index) => {
		return <PackageListItem key={index}
		                        changeAmount={changeAmount}
		                        item={item} index={index}
		                        calculatePriceOfProduct={calculatePriceOfProduct}
		                        deleteItem={deleteItem}
		                        deleteItemFromStorage={deleteItemFromStorage}
		/>
	});
	
	useEffect(() => {
		stashDataSession("package", packageList);
	}, []);
	
	useEffect(() => {
		stashDataSession("package", packageList);
	}, [packageList]);
	
	return (
		<>
			<div className="product_list">
				<h2 className="product_list__heading">Список упаковок</h2>
				<ul className="product_list__elements">
					{list}
				</ul>
				<div>
					<h3>Общая стоимость использованных упаковок:<span className="span">_</span> <u>
						{packageList
							.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount), 0)}
					</u>
					</h3>
					<button>Сохранить стоимость упаковок</button>
					<button onClick={() => clearAmount(packageList)}>Очистить количество упаковок</button>
				</div>
			</div>
		</>
	)
};

export default PackageList;
