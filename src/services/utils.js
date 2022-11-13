export const calculatePriceOfProduct = (price, amount, pack) => {
	return Math.ceil(price * (amount / pack));
};

export const finalPrice = (arr) => arr.reduce((a, b) => a + calculatePriceOfProduct(b.price, b.amount, b.pack), 0);
