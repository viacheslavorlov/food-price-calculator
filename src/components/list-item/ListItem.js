const ListElement = ({changeAmount, item, calulatePriceOfProduct, deleteItem, deleteItemFromStorage}) => {
	
	return (
		<li className="product_list__element">
			<div>{item.name}, в упаковке: <span className="span">_</span>
				<input type="number"
				       name={item.name}
					   value={item.pack}
					   onChange={(e) => {
						   changeAmount(e, "pack");
					   }}/>
				<br/>
				количество ({item.metric}):<span className="span">_</span>
				<input
					type="number"
					onChange={(e) => {
						changeAmount(e, "amount");
					}}
					value={item.amount}
					name={item.name}>
				</input>
			</div>
			<div>
				Цена за упаковку: <span className="span">_</span>
				<input
					type="number"
					value={item.price}
					onChange={(e) => {
						changeAmount(e, "price");
					}}
					name={item.name}/>
			</div>
			<div>Цена за продукт: <b>{calulatePriceOfProduct(item.price, item.amount, item.pack)} р</b></div>
			<button name={item.name} onClick={(e) => deleteItem(e)}>Удалить</button>
			<button style={{backgroundColor: 'black', color: "white"}} name={item.name} onClick={(e) => deleteItemFromStorage(e)}>Удалить из памяти</button>
		</li>
	);
};

export default ListElement;