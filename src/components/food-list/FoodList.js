import {Component} from "react";
import {stashData} from "../../services/localStorageDB";
import ListElement from "../list-item/ListItem";


class FoodList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productList: JSON.parse(localStorage.getItem("products")) || props.data,
			amount: 0
		};
	}
	
	setAmount = (e) => {
		this.setState(state => ({
			...state, amount: e.target.value
		}));
	};
	
	changeAmount = (e) => {
		let indexOfChangedItem = this.state.productList.findIndex(item => item.name === e.target.id);
		const newItem = [...this.state.productList].filter(item => item.name === e.target.id);
		newItem[0] = {...newItem[0], amount: e.target.value};
		
		const oldItemsBefore = [...this.state.productList].filter((item, i) => i < indexOfChangedItem);
		
		const oldItemsAfter = [...this.state.productList].filter((item, i) => i > indexOfChangedItem);
		console.log("newItem", newItem);
		console.log("oldBefore", oldItemsBefore);
		console.log("oldAfter", oldItemsAfter);
		this.setState((state) => ({
			...state, productList: [...oldItemsBefore, newItem[0], ...oldItemsAfter]
		}));
		
		stashData(JSON.stringify(this.state.productList));
	};
	clearAmount = (arr) => {
		this.setState(state => ({
			productList: arr.map(item => ({...item, amount: 0})),
			amount: 0
		}));
	};
	
	deleteItem = (e) => {
		const newArr = this.state.productList.filter(item => item.name !== e.target.value);
		this.setState(state => ({
			...state, productList: newArr
		}));
	}
	
	componentDidMount() {
		stashData(JSON.stringify(this.state.productList));
	}
	
	render() {
		console.log("first", this.state.productList);
		
		const calculatePriceOfProduct = (price, amount, pack) => {
			
			return Math.ceil(price * (amount / pack));
		};
		console.log("before map list", this.state.productList);
		
		const list = this.state.productList.map((item, index) => {
			
			return <ListElement key={index}
			                    changeAmount={this.changeAmount}
			                    item={item} index={index}
			                    calulatePriceOfProduct={calculatePriceOfProduct}
								deleteItem={this.deleteItem}
			                    setAmount={this.setAmount}/>;
		});
		console.log("render FoodList");
		
		return (
			<div className="product_list">
				<h2 className="product_list__heading">Список продуктов</h2>
				<ul className="product_list__elements">
					{list}
				</ul>
				<div>
					<h3>Общая стоимость использованных продуктов:   <u>
							{this.state.productList
								.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount, b.pack), 0)}
						</u>
					</h3>
					<button>Сохранить стоимость ингредиентов</button>
					<button onClick={() => this.clearAmount(this.state.productList)}>Очистить количество ингридиентов</button>
				</div>
			</div>
		);
	};
}


export default FoodList;

