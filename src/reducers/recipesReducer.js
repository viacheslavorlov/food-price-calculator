import {db} from "../database/database";
import {createSlice} from "@reduxjs/toolkit";
import {deleteFromLocalStorage, stashDataStorage} from "../services/localStorageDB";


const recipesSlice = createSlice({
	name: "recipes",
	// eslint-disable-next-line react-hooks/rules-of-hooks
	// initialState: ,
	reducers: {
		addNewActiveRecipesList: (state, action) => {
			state.activeRecipes = action.payload;
		},
		addNewRecipes: (state, action) => {
			stashDataStorage("recipes", [...state.recipes, action.payload]);
			state.recipes.push(action.payload);
		},
		addToActiveRecipes: (state, action) => {
			const singleItem = state.filteredRecipes.filter(item => item.id === action.payload)[0];
			state.filteredRecipes = state.filteredRecipes.filter(item => item.id !== singleItem.id);
			state.activeRecipes.push(singleItem);
		},
		deleteFromActiveRecipesList: (state, action) => {
			state.activeRecipes = state.activeRecipes.filter(item => item.id !== action.payload);
			// state.filteredProducts.push(...state.activeProducts.filter(item => item.id === action.payload))
		},
		filterRecipes: (state, action) => {
			if (action.payload !== "") {
				state.filteredRecipes = state.recipes.filter(item => item.name.includes(action.payload) &&
					state.activeRecipes.every(el => el.name !== item.name));
			} else {
				state.filteredRecipes = state.recipes.filter(item => state.activeRecipes.every(el => el.name !== item.name));
			}
			state.filteredRecipes = state.filteredRecipes.filter(item => item.id !== action.payload);
		},
		// deleteFromFilteredList: (state, action) => {
		// 	state.filteredProducts = state.filteredProducts.filter(item => item.id !== action.payload);
		// },
		addToFilteredRecipesList: (state, action) => {
			state.filteredRecipes.push(action.payload);
		},
		deleteFromRecipes: (state, action) => {
			state.recipes = state.recipes.filter(item => item.id !== action.payload);
			state.filteredRecipes = state.filteredRecipes.filter(item => item.id !== action.payload);
			deleteFromLocalStorage("recipes", action.payload);
		}
	}
});

export const {reducer, actions} = recipesSlice;

export const {
	addNewActiveRecipesList,
	addNewRecipes,
	addToFilteredRecipesList,
	addToActiveRecipes,
	deleteFromActiveRecipesList,
	filterRecipes,
	deleteFromRecipes,
} = actions;