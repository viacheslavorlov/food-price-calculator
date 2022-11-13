import {createSlice} from "@reduxjs/toolkit";
import * as basicData from "../db.json";
import {stashDataStorage} from "../services/localStorageDB";


const initialState = {
	packages: JSON.parse(localStorage.getItem("packages")) || basicData.default.packages,
	activePackage: [],
	filteredPackages: JSON.parse(localStorage.getItem("packages")) || basicData.default.packages
};

export const packageSlice = createSlice({
	name: "package",
	initialState,
	reducers: {
		addNewActiveList: (state, action) => {
			state.activePackage = action.payload;
		},
		addNewPackage: (state, action) => {
			stashDataStorage("package", [...state.package, action.payload]);
			state.packages.push(action.payload);
		},
		addToActiveList: (state, action) => {
			const singleItem = state.filteredPackages.filter(item => item.id === action.payload)[0];
			
			state.activePackage.push(singleItem);
		},
		deleteFromActiveList: (state, action) => {
			state.activePackage = state.activePackage.filter(item => item.id !== action.payload);
		},
		filterPackages: (state, action) => {
			if (action.payload) {
				state.filteredPackages = state.packages.filter(item => item.name.includes(action.payload));
			} else {
				state.filteredPackages = state.packages;
			}
		},
		deleteFromFilteredList: (state, action) => {
			state.filteredPackages = state.filteredPackages.filter(item => item.id !== action.payload);
		}
	}
});

export const {reducer, actions} = packageSlice;

export const {
	deleteFromActiveList,
	addNewActiveList,
	addNewPackage,
	addToActiveList,
	deleteFromFilteredList,
	filterPackages
} = actions;