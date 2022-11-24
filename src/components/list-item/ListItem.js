import "./ListItem.css";
import {calculatePriceOfProduct} from "../../services/utils";

const ListElement = ({changeAmount, item, deleteItem}) => {
	
	return (
		<div className="product_list__element">
			<div className={"product_list__element__inputs"}><b>{item.name.toUpperCase()}</b>, в упаковке: <span
				className="span">_</span>
				<input type="number"
				       min={0}
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
			<div className={"product_list__element__inputs"}>Цена за продукт:
				<b> {
					Number.isNaN(calculatePriceOfProduct(item.price, item.amount, item.pack)) ?
						"Введите числовые данные!" : calculatePriceOfProduct(item.price, item.amount, item.pack).toFixed(2) + " р"
				}</b>
			</div>
			<div className={"product_list__element__buttons"}>
				<button
					className={"product_list__element__buttons__button"}
					name={item.name}
					onClick={() => deleteItem(item.id)}>
					Удалить
				</button>
			</div>
		
		</div>
	);
};

export default ListElement;