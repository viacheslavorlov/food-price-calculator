import {configureStore} from "@reduxjs/toolkit";
import {products} from "../reducer/reducer";


const store = configureStore({reducer: products});

export default store;