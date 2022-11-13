import {configureStore} from "@reduxjs/toolkit";
import {reducer as productsReducer} from "../reducers/productsReducer";
import {reducer as packageReducer} from "../reducers/packageReducer";


const store = configureStore({
	reducer: {
		products: productsReducer,
		package: packageReducer
	}
});

export default store;