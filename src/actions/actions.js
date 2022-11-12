export const getIngredients = (arr) => {
	return {type: "GET_INGREDIENTS", payload: arr};
}
export const addNewIngredient = (ingredient) => {
	return {type: "ADD_NEW_INGREDIENT", payload: ingredient};
}
export const addIngredient = (ingredient) => {
	return {type: "ADD_NEW_INGREDIENT_TO_ACTIVE_LIST", payload: ingredient};
}
export const deleteIngredient = (id) => {
	return {type: "DELETE_INGREDIENT_FROM_ACTIVE_LIST", payload: id};
}