import React, {useState} from 'react';


const FoodList = ({data}) => {
	const [productsList, setProdectsList] = useState(data);
	const changeAmount = (e) => {
		let indexOfChangedItem;
		const newItem = [...productsList].filter((item, i) => {
			if (item.name === e.target.id) {
				indexOfChangedItem = i;
				console.log({...item, amount: e.target.value});
				return {...item, amount: e.target.value}
			}
		});

		const oldItemsBefore = [...productsList].filter((item, i) => {
			if (item.name !== e.target.id && i < indexOfChangedItem) {
				return item;
			}
		});

		const oldItemsAfter = [...productsList].filter((item, i) => {
			if (item.name !== e.target.id && i > indexOfChangedItem) {
				return item;
			}
		});

		setProdectsList([...oldItemsBefore, ...newItem, ...oldItemsAfter]);

	}
	console.log(productsList);

	// useEffect(() => {
	//
	// }, [data])
	const calulatePriceOfProduct = (price, amount, pack) => {

				return Math.round(price * (amount / pack));
			}


	const list = productsList.map((item, index) => {

		return <ListElement key={index}
		                    changeAmount={changeAmount}
		                    item={item}
		                    index={index}
		                    calulatePriceOfProduct={calulatePriceOfProduct}/>
	});
	console.log('render FoodList')

	return (
		<div className="product_list">
			<h2 className="product_list__heading">Список продуктов</h2>
			<ul className="product_list__elements">
				{list}
			</ul>
		</div>
	);
};

export default FoodList;

const ListElement = ({item, calulatePriceOfProduct, changeAmount}) => {
	const [amountItem, setAmountItem] = useState(item.amount);
	return (
		<li className="product_list__element">
			<div>{item.name} <br/>
				количество ({item.metric})<input
					type="number"
					onChange={(e) => {
						setAmountItem(e.target.value);
						changeAmount(e);
					}}
					value={amountItem}
					id={item.name}>
				</input>
			</div>
			<div>Цена за продукт: {calulatePriceOfProduct(item.price, amountItem, item.pack)}</div>
		</li>
	)
}