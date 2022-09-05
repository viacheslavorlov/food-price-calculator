import "./ListItem.css";

const ListElement = ({changeAmount, item, calulatePriceOfProduct, deleteItem, deleteItemFromStorage}) => {
	
	return (
		<li className="product_list__element">
			<div className={"product_list__element__inputs"}>{item.name}, в упаковке: <span className="span">_</span>
				<input type="number"
				       name={item.name}
					   value={item.pack}
					   onChange={(e) => {
						   changeAmount(e, "pack");
					   }}/>
			</div>
			<div className={"product_list__element__inputs"}>
				Использованное количество ({item.metric}):<span className="span">_</span>
				<input
					type="number"
					onChange={(e) => {
						changeAmount(e, "amount");
					}}
					value={item.amount}
					name={item.name}>
				</input>
			</div>
			<div className={"product_list__element__inputs"}>
				Цена за упаковку: <span className="span">_</span>
				<input
					type="number"
					value={item.price}
					onChange={(e) => {
						changeAmount(e, "price");
					}}
					name={item.name}/>
			</div>
			<div className={"product_list__element__inputs"}>Цена за продукт: <b>{calulatePriceOfProduct(item.price, item.amount, item.pack)} р</b></div>
			<div className={"product_list__element__buttons"}>
				<button
					className={"product_list__element__buttons__button"}
					name={item.name}
					onClick={(e) => deleteItem(e)}>
					Удалить
				</button>
				<button
					className={"product_list__element__buttons__button"}
					style={{backgroundColor: 'black', color: "white"}}
					name={item.name}
					onClick={(e) => deleteItemFromStorage(e)}>
					Удалить из памяти
				</button>
			</div>
			
		</li>
	);
};

export default ListElement;