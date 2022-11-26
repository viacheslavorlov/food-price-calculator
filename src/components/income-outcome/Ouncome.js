import React, {useState} from "react";
import {useSelector} from "react-redux";
import {finalPrice} from "../../services/utils";
import "./Outcom.css";

const Outcome = () => {
	const [percent, setPercent] = useState(25);
	const {activeProducts} = useSelector(state => state.products);
	const {activePackage} = useSelector(state => state.package);
	const productsCost = finalPrice(activeProducts);
	const packageCost = finalPrice(activePackage);
	const lightCost = finalPrice(activeProducts) * 1.1;
	const costWithPercent = ((lightCost + packageCost) * ((100 + Number.parseInt(percent)) / 100))
	
	const cost = (num) => num ? num.toFixed(2) + 'р' : "Введите числовые данные"
	
	return (
		<div className={"outcome"}>
			<h3>Стоимость израсходованных продуктов: {cost(productsCost)}.</h3>
			<h3>Стоимость израсходованных упаковочных материалов: {cost(packageCost)}</h3>
			<h3>Стоимость с учётом наценки за свет: {cost(lightCost)}</h3>
			<h3>Общая стоимость  с учётом
				<input
					value={percent}
					onChange={e => setPercent(e.target.value)}
					className={"percent__input"}
					type="number"/>
				% наценки: <span className={"underline"}>{cost(costWithPercent)}</span></h3>
		</div>
	);
};

export default Outcome;
