export const stashData = (productArray) => {
	
	localStorage.setItem("products", productArray);
};