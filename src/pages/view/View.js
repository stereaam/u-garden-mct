import React, { useState, useEffect } from "react";
import Map from "./components/map/Map";
import Menu from "./components/side-menu/Menu";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import SortableTable from "./components/map/components/sortable-table/SortableTable";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import GradientLegend from "./components/map/components/gradient-legened/GradientLegend";
import styles from "./View.module.scss";
import { useDispatch } from "react-redux";
import { updateJsonData } from "../../redux/actions/actions";

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

function aritmethicMean(arr) {
	if (arr.length === 0) {
		return 0;
	}

	const sum = arr.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		0
	);
	const mean = sum / arr.length;

	return mean;
}

const calculateNormalizedValue = (value, minMax) => {
	if (minMax[0] === minMax[1]) {
		return 1;
	}
	return (value - minMax[0]) / (minMax[1] - minMax[0]);
};

function findMinMaxValues(data) {
	const minMaxValues = {};
	for (const prop in data[0]) {
		if (prop !== "coordinates") {
			minMaxValues[prop] = [data[0][prop], data[0][prop]];
		}
	}

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

function View() {
	const dispatch = useDispatch();
	const [mapProvider, setMapProvider] = useState("openstreetmap");
	const [jsonData, setJsonData] = useState(
		useSelector((state) => state.jsonData)
	);
	const [sliderValues, setSliderValues] = useState({
		urban: 0,
		spatial: 0,
		environmental: 0,
		economic: 0,
		politic: 0,
		social: 0,
	});
	const [categoryItems, setCategoryItems] = useState(
		useSelector((state) => state.categoryItems)
	);
	console.log(categoryItems);
	const [categoryValues, setCategoryValues] = useState([]);

	const [selectedOption, setSelectedOption] = useState("map");

	useEffect(() => {
		const minMaxValues = findMinMaxValues(jsonData.map((item) => item.data));
		const normalizedCategoryValues = [];
		jsonData.forEach((item) => {
			const categoryData = {};
			Object.entries(categoryItems).forEach(([key, values]) => {
				console.log("fnjsn", values);
				categoryData[key] = aritmethicMean(
					values.map((value) => {
						const normalizedValue = calculateNormalizedValue(
							item.data[value.name],
							minMaxValues[value.name]
						);
						return value.inverted ? 1 - normalizedValue : normalizedValue;
					})
				);
			});

			normalizedCategoryValues.push({ ...categoryData, name: item?.name });
		});

		setCategoryValues(
			normalizedCategoryValues.map((item, index) => {
				return {
					...item,
					total: getTotalValue(normalizedCategoryValues[index], sliderValues),
				};
			})
		);
		const parsedData = jsonData.map((item, index) => {
			return {
				...item,
				totalValue: getTotalValue(
					normalizedCategoryValues[index],
					sliderValues
				),
			};
		});
		dispatch(updateJsonData(parsedData));
		setJsonData(parsedData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryItems, sliderValues]);
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

				<div className={styles.mapContainer}>
					<div className={styles.innerWrapper}>
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
							parsedData={[]}
							sliderValues={sliderValues}
						/>
					) : (
						<SortableTable parsedCategoryValues={categoryValues} />
					)}
				</div>
			</div>
		</>
	);
}

export default View;
