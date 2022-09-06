export const stashDataSession = (storageName, productArray) => {
	sessionStorage.setItem(storageName, JSON.stringify(productArray));
};

export const stashDataStorage = (storageName, productArray) => {
	localStorage.setItem(storageName, JSON.stringify(productArray));
};