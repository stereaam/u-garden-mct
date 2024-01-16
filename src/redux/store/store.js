// store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
	jsonData: [],
	categoryItems: {
		urban: [],
		spatial: [],
		environmental: [],
		economic: [],
		politic: [],
		social: [],
	},
	variables: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case "UPDATE_JSON_DATA":
			return {
				...state,
				jsonData: action.payload,
			};
		case "UPDATE_CATEGORY_ITEMS":
			return {
				...state,
				categoryItems: action.payload,
			};
		case "UPDATE_VARIABLES":
			return {
				...state,
				variables: action.payload,
			};
		default:
			return state;
	}
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
