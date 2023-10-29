// store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
	jsonData: [
		{
			name: "Piata Unirii",
			size: 147,
			soilQuality: 30,
			elderPeoplePercentage: 23,
			employedPeoplePercentage: 39,
			budget: 150333,
			plantSpecies: 9,
			interestedResidentsPercentage: 75,
			shapeIndex: 14,
			coordinates: [
				["44.4660", "26.0830"],
				["44.4660", "26.0910"],
				["44.4740", "26.0910"],
				["44.4740", "26.0830"],
			],
		},
		{
			name: "Berceni",
			size: 150,
			soilQuality: 80,
			elderPeoplePercentage: 32,
			employedPeoplePercentage: 89,
			budget: 1500000,
			plantSpecies: 12,
			interestedResidentsPercentage: 90,
			shapeIndex: 14,
			coordinates: [
				["44.4298", "26.0996"],
				["44.4308", "26.0996"],
				["44.4308", "26.1006"],
				["44.4298", "26.1006"],
			],
		},
		{
			name: "Titan",
			size: 400,
			soilQuality: 30,
			elderPeoplePercentage: 34,
			employedPeoplePercentage: 89,
			budget: 8999990,
			plantSpecies: 45,
			interestedResidentsPercentage: 58,
			shapeIndex: 40,
			coordinates: [
				["44.4300", "26.1005"],
				["44.4300", "26.1065"],
				["44.4360", "26.1065"],
				["44.4360", "26.1005"],
			],
		},

		{
			name: "Timpuri Noi",
			size: 200,
			soilQuality: 30,
			elderPeoplePercentage: 27,
			employedPeoplePercentage: 44,
			budget: 566666,
			plantSpecies: 25,
			interestedResidentsPercentage: 90,
			shapeIndex: 17,
			coordinates: [
				["44.4720", "26.0830"],
				["44.4720", "26.0890"],
				["44.4790", "26.0890"],
				["44.4790", "26.0830"],
			],
		},
		{
			name: "Politehnica",
			size: 12,
			soilQuality: 30,
			elderPeoplePercentage: 44,
			employedPeoplePercentage: 98,
			budget: 110000,
			plantSpecies: 12,
			interestedResidentsPercentage: 18,
			shapeIndex: 2,
			coordinates: [
				["44.4250", "26.0845"],
				["44.4250", "26.0915"],
				["44.4325", "26.0915"],
				["44.4325", "26.0845"],
			],
		},
		{
			name: "Aviatorilor",
			size: 400,
			soilQuality: 80,
			elderPeoplePercentage: 30,
			employedPeoplePercentage: 70,
			budget: 1200000,
			plantSpecies: 20,
			interestedResidentsPercentage: 60,
			shapeIndex: 25,
			coordinates: [
				["44.4700", "26.0700"],
				["44.4700", "26.0800"],
				["44.4800", "26.0800"],
				["44.4800", "26.0700"],
			],
		},
		{
			name: "Ferentari",
			size: 250,
			soilQuality: 45,
			elderPeoplePercentage: 20,
			employedPeoplePercentage: 45,
			budget: 400000,
			plantSpecies: 12,
			interestedResidentsPercentage: 80,
			shapeIndex: 16,
			coordinates: [
				["44.4500", "26.0800"],
				["44.4500", "26.0900"],
				["44.4600", "26.0900"],
				["44.4600", "26.0800"],
			],
		},
		{
			name: "Mihai Bravu",
			size: 300,
			soilQuality: 70,
			elderPeoplePercentage: 25,
			employedPeoplePercentage: 60,
			budget: 800000,
			plantSpecies: 15,
			interestedResidentsPercentage: 70,
			shapeIndex: 20,
			coordinates: [
				["44.4800", "26.1000"],
				["44.4800", "26.1100"],
				["44.4900", "26.1100"],
				["44.4900", "26.1000"],
			],
		},
		{
			name: "Universitatii",
			size: 175,
			soilQuality: 35,
			elderPeoplePercentage: 26,
			employedPeoplePercentage: 44,
			budget: 190000,
			plantSpecies: 10,
			interestedResidentsPercentage: 68,
			shapeIndex: 16,
			coordinates: [
				["44.4400", "26.0800"],
				["44.4400", "26.0850"],
				["44.4450", "26.0850"],
				["44.4450", "26.0800"],
			],
		},
		{
			name: "Piata Romana",
			size: 155,
			soilQuality: 32,
			elderPeoplePercentage: 25,
			employedPeoplePercentage: 42,
			budget: 170000,
			plantSpecies: 7,
			interestedResidentsPercentage: 70,
			shapeIndex: 12,
			coordinates: [
				["44.4420", "26.0860"],
				["44.4420", "26.0910"],
				["44.4470", "26.0910"],
				["44.4470", "26.0860"],
			],
		},
		{
			name: "Dimitrie Leonida",
			size: 185,
			soilQuality: 38,
			elderPeoplePercentage: 30,
			employedPeoplePercentage: 48,
			budget: 210000,
			plantSpecies: 11,
			interestedResidentsPercentage: 73,
			shapeIndex: 14,
			coordinates: [
				["44.4440", "26.0920"],
				["44.4440", "26.0970"],
				["44.4490", "26.0970"],
				["44.4490", "26.0920"],
			],
		},
		{
			name: "Constantin Brancoveanu",
			size: 165,
			soilQuality: 28,
			elderPeoplePercentage: 21,
			employedPeoplePercentage: 37,
			budget: 160000,
			plantSpecies: 8,
			interestedResidentsPercentage: 66,
			shapeIndex: 10,
			coordinates: [
				["44.4460", "26.0980"],
				["44.4460", "26.1030"],
				["44.4510", "26.1030"],
				["44.4510", "26.0980"],
			],
		},
		{
			name: "Piata Unirii 2",
			size: 160,
			soilQuality: 33,
			elderPeoplePercentage: 28,
			employedPeoplePercentage: 45,
			budget: 180000,
			plantSpecies: 9,
			interestedResidentsPercentage: 69,
			shapeIndex: 13,
			coordinates: [
				["44.4480", "26.1040"],
				["44.4480", "26.1090"],
				["44.4530", "26.1090"],
				["44.4530", "26.1040"],
			],
		},
	],
	categories: {
		urban: [
			{
				name: "budget",
			},
			{
				name: "elderPeoplePercentage",
			},
		],
		spatial: [
			{
				name: "size",
			},
		],
		environmental: [
			{
				name: "plantSpecies",
			},
			{
				name: "employedPeoplePercentage",
			},
		],
		economic: [
			{
				name: "interestedResidentsPercentage",
			},
		],
		politic: [
			{
				name: "shapeIndex",
			},
		],
		social: [
			{
				name: "soilQuality",
			},
		],
	},
};

const rootReducer = (state = initialState, action) => {
	// Handle actions and update the state here
	return state; // For now, the reducer just returns the state as is
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
