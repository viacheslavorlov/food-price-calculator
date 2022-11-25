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
	let costWithPercent;
	if (Number.isNaN(percent) || percent === '') {
		costWithPercent = 'Введите процент наценки';
	} else {
		costWithPercent = (lightCost * ((100 + Number.parseInt(percent)) / 100))
	}
	console.log(percent);
	
	return (
		<div className={"outcome"}>
			<h3>Стоимость израсходованных продуктов: {productsCost.toFixed(2)}р.</h3>
			<h3>Стоимость израсходованных упаковочных материалов: {packageCost.toFixed(2)}р.</h3>
			<h3>Стоимость с учётом наценки за свет: {lightCost.toFixed(2)}</h3>
			<h3>Общая стоимость  с учётом
				<input
					value={percent}
					onChange={e => setPercent(e.target.value)}
					className={"percent__input"}
					type="number"/>
				% наценки: <span className={"underline"}>{costWithPercent.toFixed(2)}</span></h3>
		</div>
	);
};

export default Outcome;
