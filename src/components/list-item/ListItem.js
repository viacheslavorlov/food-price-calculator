const ListElement = ({changeAmount, item, calulatePriceOfProduct, setAmount, deleteItem}) => {
	
	return (
		<li className="product_list__element">
			<div>{item.name} <br/>
				количество ({item.metric}): <input
					type="number"
					onChange={(e) => {
						setAmount(e);
						changeAmount(e);
					}}
					value={item.amount}
					id={item.name}>
				</input>
			</div>
			<div>Цена за продукт: {calulatePriceOfProduct(item.price, item.amount, item.pack)}</div>
			<button value={item.name} onClick={(e) => deleteItem(e)}>Удалить</button>
		</li>
	);
};

export default ListElement;