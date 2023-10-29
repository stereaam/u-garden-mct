import React, { useState, useEffect } from "react";
import Map from "./components/map/Map";
import Menu from "./components/side-menu/Menu";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import SortableTable from "./components/map/components/sortable-table/SortableTable";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import GradientLegend from "./components/map/components/gradient-legened/GradientLegend";
const getTotalValue = (values, sliderValues) => {
	let total = 0;

	Object.keys(values).forEach((key) => {
		if (key !== "name") {
			total = total + values[key] * sliderValues[key];
		}
	});
	return total
		? total /
				Object.values(sliderValues).reduce(
					(accumulator, currentValue) => accumulator + currentValue,
					0
				)
		: 0;
};

function createObjectFromArray(array) {
	const resultObject = {};

	for (let i = 0; i < array.length; i++) {
		const subObject = array[i];
		const subKey = Object.keys(subObject)[0];
		const subValue = subObject[subKey];
		resultObject[subKey] = subValue;
	}

	return resultObject;
}
function View() {
	const [mapProvider, setMapProvider] = useState("openstreetmap");
	const [sliderValues, setSliderValues] = useState({
		urban: 0,
		spatial: 0,
		environmental: 0,
		economic: 0,
		politic: 0,
		social: 0,
	});

	function findMinMaxValues(data) {
		// Initialize an object to store the minimum and maximum values for each property
		const minMaxValues = {};

		// Iterate through the properties of the first object to initialize the minMaxValues object
		for (const prop in data[0]) {
			if (prop !== "coordinates") {
				minMaxValues[prop] = [data[0][prop], data[0][prop]];
			}
		}

		// Iterate through the array of objects to find the actual minimum and maximum values
		for (const item of data) {
			for (const prop in item) {
				if (prop !== "coordinates") {
					const value = item[prop];
					const [min, max] = minMaxValues[prop];
					if (value < min) {
						minMaxValues[prop][0] = value;
					}
					if (value > max) {
						minMaxValues[prop][1] = value;
					}
				}
			}
		}

		return minMaxValues;
	}
	const [jsonData, setJsonData] = useState(
		useSelector((state) => state.jsonData)
	);
	const [categories, setCategories] = useState(
		useSelector((state) => state.categories)
	);
	const [categoryValues, setCategoryValues] = useState([]);
	const [parsedCategoryValues, setParsedCategoryValues] = useState([]);
	function aritmethicMean(arr) {
		if (arr.length === 0) {
			return 0; // Handle the case where the array is empty to avoid division by zero.
		}

		const sum = arr.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);
		const mean = sum / arr.length;

		return mean;
	}
	const [selectedOption, setSelectedOption] = useState("map");
	useEffect(() => {
		setParsedData(
			jsonData.map((item, index) => {
				return {
					...item,
					totalValue:
						categoryValues && categoryValues.length > 0
							? getTotalValue(
									createObjectFromArray(categoryValues[index]),
									sliderValues
							  )
							: 1,
				};
			})
		);
		setParsedCategoryValues(
			categoryValues
				.map((item) => createObjectFromArray(item))
				.map((item, index) => {
					console.log(item);
					return {
						...item,
						total:
							categoryValues && categoryValues.length > 0
								? getTotalValue(
										createObjectFromArray(categoryValues[index]),
										sliderValues
								  )
								: 1,
					};
				})
		);
	}, [categoryValues, jsonData, sliderValues]);
	console.log(parsedCategoryValues);
	const [parsedData, setParsedData] = useState(jsonData);
	useEffect(() => {
		const minMaxValues = findMinMaxValues(jsonData);
		const _categoryValues = [];
		jsonData.forEach((item) => {
			_categoryValues.push([
				...Object.entries(categories).map(([key_, values]) => {
					return {
						[key_]: aritmethicMean(
							values.map((value) => {
								return (item[value.name] =
									(item[value.name] - minMaxValues[value.name][0]) /
									(minMaxValues[value.name][1] - minMaxValues[value.name][0]));
							})
						),
					};
				}),
				{ name: item.name },
			]);
		});
		console.log(_categoryValues);
		setCategoryValues(_categoryValues);
	}, [categories, jsonData]);
	return (
		<>
			<div className="header">
				<Header />
			</div>
			<div className="content">
				<Menu
					mapProvider={mapProvider}
					setMapProvider={setMapProvider}
					sliderValues={sliderValues}
					setSliderValues={setSliderValues}
					selectedOption={selectedOption}
				/>

				<div className="map-container">
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "20px",
						}}
					>
						<ToggleButtonGroup
							value={selectedOption}
							exclusive
							onChange={(e) => setSelectedOption(e.target.value)}
							aria-label="button group"
						>
							<ToggleButton value="map" aria-label="map" color="primary">
								Map
							</ToggleButton>
							<ToggleButton value="table" aria-label="table" color="primary">
								Table
							</ToggleButton>
						</ToggleButtonGroup>
						{selectedOption === "map" && (
							<div className="gradient-wrapper">
								<GradientLegend className="gradient" />
							</div>
						)}
					</div>
					{selectedOption === "map" ? (
						<Map
							coords={{ latitude: 44.4268, longitude: 26.1025 }}
							mapProvider={mapProvider}
							categoryValues={categoryValues}
							jsonData={jsonData}
							parsedData={parsedData}
							sliderValues={sliderValues}
						/>
					) : (
						<div style={{ width: "100%", height: "100%" }}>
							<SortableTable parsedCategoryValues={parsedCategoryValues} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default View;
