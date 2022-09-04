export const stashDataSession = (productArray) => {
	sessionStorage.setItem("products", productArray);
};

export const stashDataStorage = (productArray) => {
	localStorage.setItem("products", productArray);
};