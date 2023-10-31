// store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
	jsonData: [
		// {
		// 	name: "Piata Unirii",
		// 	data: {
		// 		size: 147,
		// 		soilQuality: 30,
		// 		elderPeoplePercentage: 23,
		// 		employedPeoplePercentage: 39,
		// 		budget: 150333,
		// 		plantSpecies: 9,
		// 		interestedResidentsPercentage: 75,
		// 		shapeIndex: 14,
		// 	},
		// 	coordinates: [
		// 		["44.4660", "26.0830"],
		// 		["44.4660", "26.0910"],
		// 		["44.4740", "26.0910"],
		// 		["44.4740", "26.0830"],
		// 	],
		// },
		// {
		// 	name: "Berceni",
		// 	data: {
		// 		size: 150,
		// 		soilQuality: 80,
		// 		elderPeoplePercentage: 32,
		// 		employedPeoplePercentage: 89,
		// 		budget: 1500000,
		// 		plantSpecies: 12,
		// 		interestedResidentsPercentage: 90,
		// 		shapeIndex: 14,
		// 	},
		// 	coordinates: [
		// 		["44.4298", "26.0996"],
		// 		["44.4308", "26.0996"],
		// 		["44.4308", "26.1006"],
		// 		["44.4298", "26.1006"],
		// 	],
		// },
		// {
		// 	name: "Titan",
		// 	data: {
		// 		size: 400,
		// 		soilQuality: 30,
		// 		elderPeoplePercentage: 34,
		// 		employedPeoplePercentage: 89,
		// 		budget: 8999990,
		// 		plantSpecies: 45,
		// 		interestedResidentsPercentage: 58,
		// 		shapeIndex: 40,
		// 	},
		// 	coordinates: [
		// 		["44.4300", "26.1005"],
		// 		["44.4300", "26.1065"],
		// 		["44.4360", "26.1065"],
		// 		["44.4360", "26.1005"],
		// 	],
		// },
		// {
		// 	name: "Timpuri Noi",
		// 	data: {
		// 		size: 200,
		// 		soilQuality: 30,
		// 		elderPeoplePercentage: 27,
		// 		employedPeoplePercentage: 44,
		// 		budget: 566666,
		// 		plantSpecies: 25,
		// 		interestedResidentsPercentage: 90,
		// 		shapeIndex: 17,
		// 	},
		// 	coordinates: [
		// 		["44.4720", "26.0830"],
		// 		["44.4720", "26.0890"],
		// 		["44.4790", "26.0890"],
		// 		["44.4790", "26.0830"],
		// 	],
		// },
		// {
		// 	name: "Politehnica",
		// 	data: {
		// 		size: 12,
		// 		soilQuality: 30,
		// 		elderPeoplePercentage: 44,
		// 		employedPeoplePercentage: 98,
		// 		budget: 110000,
		// 		plantSpecies: 12,
		// 		interestedResidentsPercentage: 18,
		// 		shapeIndex: 2,
		// 	},
		// 	coordinates: [
		// 		["44.4250", "26.0845"],
		// 		["44.4250", "26.0915"],
		// 		["44.4325", "26.0915"],
		// 		["44.4325", "26.0845"],
		// 	],
		// },
	],
	categoryItems: {
		urban: [],
		spatial: [],
		environmental: [],
		economic: [],
		politic: [],
		social: [],
	},
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
		default:
			return state;
	}
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
