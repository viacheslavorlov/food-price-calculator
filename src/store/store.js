import {configureStore} from "@reduxjs/toolkit";
import {reducer as productsReducer} from "../reducers/productsReducer";
import {reducer as packageReducer} from "../reducers/packageReducer";
import {reducer as recipesReducer} from "../reducers/recipesReducer";


const store = configureStore({
	reducer: {
		products: productsReducer,
		package: packageReducer,
		// recipes: recipesReducer
	}
});

export default store;