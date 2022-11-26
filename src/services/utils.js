export const calculatePriceOfProduct = (price, amount, pack) => {
	
	return (parseFloat(price) * (parseFloat(amount) / parseFloat(pack)));
};

export const finalPrice = (arr) => {
	return arr.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount, b.pack), 0);
}

export function compare(a, b) {
	if ( a.name < b.name ) {
		return -1;
	}
	if ( a.name > b.name ) {
		return 1;
	}
	return 0;
}