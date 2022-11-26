import {createSlice} from "@reduxjs/toolkit";
import * as basicData from "../db.json";
import {deleteFromLocalStorage, stashDataStorage} from "../services/localStorageDB";


const initialState = {
	packages: (JSON.parse(localStorage.getItem("package")) || basicData.default.packages)
		.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)),
	activePackage: [],
	filteredPackages: (JSON.parse(localStorage.getItem("package")) || basicData.default.packages)
		.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
};

export const packageSlice = createSlice({
	name: "package",
	initialState,
	reducers: {
		addNewActiveList: (state, action) => {
			state.activePackage = action.payload;
		},
		addNewPackage: (state, action) => {
			stashDataStorage("package", [...state.packages, action.payload]);
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
			// state.filteredPackages = state.filteredPackages.filter(item => item.id !== action.payload);
		},
		// deleteFromFilteredList: (state, action) => {
		// 	state.filteredPackages = state.filteredPackages.filter(item => item.id !== action.payload);
		// },
		deleteFromPackages: (state, action) => {
			state.packages = state.packages.filter(item => item.id !== action.payload);
			state.filteredPackages = state.filteredPackages.filter(item => item.id !== action.payload);
			deleteFromLocalStorage("package", action.payload)
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
	filterPackages,
	deleteFromPackages
} = actions;