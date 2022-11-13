import React from "react";
import {useSelector} from "react-redux";
import {finalPrice} from "../../services/utils";

const Outcome = () => {
	const {activeProducts} = useSelector(state => state.products);
	const {activePackage} = useSelector(state => state.package);
	const productsCost = finalPrice(activeProducts);
	const packageCost = finalPrice(activePackage)
	
	
	return (
		<div>
			<h3>Стоимость израсходованных продуктов: {productsCost}р.</h3>
			<h3>Стоимость израсходованных упаковочных материалов: {packageCost}р.</h3>
			<h3>Общая стоимость  с учётом 15% наценки: {Math.ceil((productsCost + packageCost) * 1.15)}</h3>
		</div>
	);
};

export default Outcome;
