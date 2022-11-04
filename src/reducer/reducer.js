import * as ingredients from "../db.json";

const initialState = ingredients.default || JSON.parse(localStorage.getItem('products'));

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_INGREDIENTS":
			return {...state, ingredients: action.payload};
		default:
			return state;
	}
}