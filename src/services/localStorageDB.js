export const stashDataSession = (storageName, productArray) => {
	sessionStorage.setItem(storageName, JSON.stringify(productArray));
};

export const stashDataStorage = (storageName, productArray) => {
	localStorage.setItem(storageName, JSON.stringify(productArray));
};

export const deleteFromLocalStorage = (storageName, id) => {
	const oldArr = JSON.parse(localStorage.getItem(storageName));
	const newArr = oldArr.filter(item => item.id !== id);
	stashDataStorage(storageName, newArr);
}