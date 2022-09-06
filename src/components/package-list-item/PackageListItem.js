import "./PackageListItem.css";
import React from "react";

const PackageListItem = ({item, deleteItem, deleteItemFromStorage, changeAmount, calculatePriceOfProduct}) => {
	return (
		<li className="package_list__element">
			<div className={"package_list__element__name"}><b>{item.name.toUpperCase()} {item.metric.toUpperCase()}</b>: <span className="span">_</span></div>
			<div className={"package_list__element__inputs"}>
				Использованное количество: <span className="span">_</span>
				<input
					type="number"
					onChange={(e) => {
						changeAmount(e, "amount");
					}}
					value={item.amount}
					name={item.name}>
				</input>
			</div>
			<div className={"package_list__element__inputs"}>
				Цена за упаковку: <span className="span">_</span>
				<input
					type="number"
					value={item.price}
					onChange={(e) => {
						changeAmount(e, "price");
					}}
					name={item.name}/>
			</div>
			<div className={"package_list__element__inputs"}>Цена за продукт: <b>{calculatePriceOfProduct(item.price, item.amount)} р</b></div>
			<div className={"package_list__element__buttons"}>
				<button
					className={"package_list__element__buttons__button"}
					name={item.name}
					onClick={(e) => deleteItem(e)}>
					Удалить
				</button>
				<button
					className={"package_list__element__buttons__button"}
					style={{backgroundColor: 'black', color: "white"}}
					name={item.name}
					onClick={(e) => deleteItemFromStorage(e)}>
					Удалить из памяти
				</button>
			</div>
		</li>
	);
};

export default PackageListItem;
