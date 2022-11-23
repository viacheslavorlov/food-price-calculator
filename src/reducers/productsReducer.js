import {createSlice} from "@reduxjs/toolkit";
import * as basicData from "../db.json";
import {deleteFromLocalStorage, stashDataStorage} from "../services/localStorageDB";


const initialState = {
	products: JSON.parse(localStorage.getItem("products")) || basicData.default.ingredients,
	activeProducts: [],
	filteredProducts: JSON.parse(localStorage.getItem("products")) || basicData.default.ingredients
};

export const products = createSlice({
	name: "products",
	initialState,
	reducers: {
		addNewActiveList: (state, action) => {
			state.activeProducts = action.payload;
		},
		addNewIngredient: (state, action) => {
			stashDataStorage("products", [...state.products, action.payload]);
			state.products.push(action.payload);
		},
		addToActiveList: (state, action) => {
			const singleItem = state.filteredProducts.filter(item => item.id === action.payload)[0];
			state.filteredProducts = state.filteredProducts.filter(item => item.id !== singleItem.id);
			state.activeProducts.push(singleItem);
		},
		deleteFromActiveList: (state, action) => {
			state.activeProducts = state.activeProducts.filter(item => item.id !== action.payload);
			// state.filteredProducts.push(...state.activeProducts.filter(item => item.id !== action.payload))
		},
		filterProducts: (state, action) => {
			if (action.payload !== '') {
				state.filteredProducts = state.products.filter(item => item.name.includes(action.payload) &&
					state.activeProducts.every(el => el.name !==item.name));
			} else {
				state.filteredProducts = state.products.filter(item => state.activeProducts.every(el => el.name !==item.name))
			}
			state.filteredProducts = state.filteredProducts.filter(item => item.id !== action.payload)
		},
		// deleteFromFilteredList: (state, action) => {
		// 	state.filteredProducts = state.filteredProducts.filter(item => item.id !== action.payload);
		// },
		addToFilteredList: (state, action) => {
			state.filteredProducts.push(action.payload);
		},
		deleteFromProducts: (state, action) => {
			state.products = state.products.filter(item => item.id !== action.payload);
			state.filteredProducts = state.filteredProducts.filter(item => item.id !== action.payload);
			deleteFromLocalStorage("products", action.payload);
		}
	}
});

export const {reducer, actions} = products;


export const {
	addToFilteredList,
	addNewActiveList,
	addNewIngredient,
	addToActiveList,
	deleteFromActiveList,
	filterProducts,
	deleteFromFilteredList,
	deleteFromProducts
} = actions;


// 		case "ADD_NEW_INGREDIENT":
// 			const newListOfIngredients = [...state.products, action.payload];
// 			return {...state, products: newListOfIngredients};
// 		case "ADD_NEW_INGREDIENT_TO_ACTIVE_LIST":
// 			return {...state, activeProducts: [...state.activeProducts, action.payload]};
// 		case "DELETE_INGREDIENT_FROM_ACTIVE_LIST":
// 			return {
// 				...state,
// 				activeProducts: [...state.activeProducts.filter(item => item.name === action.payload)]
// 			}
// 		default:
// 			return state;
// 	}
// }

