import React, { useState, useEffect } from "react";
import Map from "./components/map/Map";
import SideMenu from "./components/side-menu/SideMenu";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import ScoreTable from "./components/score-table/ScoreTable";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import GradientLegend from "./components/map/components/gradient-legened/GradientLegend";
import styles from "./View.module.scss";
import { useDispatch } from "react-redux";
import { updateJsonData } from "../../redux/actions/actions";
import { useTranslation } from "react-i18next";

const VIEW_TYPE = {
	MAP: "map",
	TABLE: "table",
};

const getTotalValue = (values, sliderValues) => {
	let total = 0;
	Object.keys(values).forEach((key) => {
		if (key !== "name") {
			total = total + parseFloat(values[key]) * sliderValues[key];
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

function getAritmethicMean(arr) {
	if (arr.length === 0) {
		return 0;
	}
	const sum = arr.reduce(
		(accumulator, currentValue) => accumulator + currentValue,
		0
	);
	return sum / arr.length;
}

const getNormalizedValue = (value, min, max) =>
	min === max ? 1 : (value - min) / (max - min);

const getMinMaxValues = (data) => {
	const minMaxValues = {};
	data.forEach((item) => {
		Object.keys(item).forEach((key) => {
			const currentValue = item[key];
			minMaxValues[key] = {
				min: Math.min(currentValue, minMaxValues[key]?.min || currentValue),
				max: Math.max(currentValue, minMaxValues[key]?.max || currentValue),
			};
		});
	});
	return minMaxValues;
};
function calculateCenter(coordinates) {
	if (coordinates.length === 0) {
		return null;
	}
	let sumX = 0;
	let sumY = 0;
	for (let i = 0; i < coordinates.length; i++) {
		sumX += parseFloat(coordinates[i][0]);
		sumY += parseFloat(coordinates[i][1]);
	}
	const centerX = sumX / coordinates.length;
	const centerY = sumY / coordinates.length;
	return [centerX, centerY];
}
const normalizeCategoryValues = (jsonData, categoryItems) => {
	const minMaxValues = getMinMaxValues(jsonData.map((item) => item.data));
	const normalizedCategoryValues = [];
	jsonData.forEach((item) => {
		const categoryData = {};
		Object.entries(categoryItems).forEach(([key, values]) => {
			categoryData[key] = getAritmethicMean(
				values.map((value) => {
					const normalizedValue = getNormalizedValue(
						item.data[value.name],
						minMaxValues[value.name].min,
						minMaxValues[value.name].max
					);
					return value.inverted ? 1 - normalizedValue : normalizedValue;
				})
			);
		});

		normalizedCategoryValues.push({ ...categoryData, name: item.name });
	});
	return normalizedCategoryValues;
};
function View() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [mapProvider, setMapProvider] = useState("openstreetmap");
	const [jsonData, setJsonData] = useState(
		useSelector((state) => state.jsonData)
	);
	const [sliderValues, setSliderValues] = useState(
		useSelector((state) => state.sliderValues)
	);
	const [categoryItems, setCategoryItems] = useState(
		useSelector((state) => state.categoryItems)
	);
	const [plotsScore, setPlotsScore] = useState([]);
	const [viewType, setViewType] = useState(VIEW_TYPE.MAP);

	const center = calculateCenter(
		jsonData.map((item) => {
			return calculateCenter(item.coordinates);
		})
	);

	useEffect(() => {
		const normalizedCategoryValues = normalizeCategoryValues(
			jsonData,
			categoryItems
		).map((item) => {
			Object.entries(item).forEach(([key, value]) => {
				if (key !== "name") {
					item[key] = value.toFixed(4);
				}
			});
			return item;
		});

		setPlotsScore(
			normalizedCategoryValues.map((item, index) => {
				return {
					...item,
					total: getTotalValue(
						normalizedCategoryValues[index],
						sliderValues
					).toFixed(4),
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
			<div className={styles.headerWrapper}>
				<Header />
			</div>
			<div className={styles.viewContainer}>
				<SideMenu
					mapProvider={mapProvider}
					setMapProvider={setMapProvider}
					sliderValues={sliderValues}
					setSliderValues={setSliderValues}
					viewType={viewType}
				/>
				<div className={styles.mapContainer}>
					<div className={styles.innerWrapper}>
						<ToggleButtonGroup
							value={viewType}
							exclusive
							onChange={(e) => setViewType(e.target.value)}
						>
							<ToggleButton value="map" color="primary">
								{t("map")}
							</ToggleButton>
							<ToggleButton value="table" color="primary">
								{t("table")}
							</ToggleButton>
						</ToggleButtonGroup>
						{viewType === VIEW_TYPE.MAP && <GradientLegend />}
					</div>
					{viewType === VIEW_TYPE.MAP ? (
						<Map
							coords={{
								latitude: center ? center[0] : 0,
								longitude: center ? center[1] : 0,
							}}
							mapProvider={mapProvider}
							jsonData={jsonData}
							plotsScore={plotsScore}
						/>
					) : (
						<ScoreTable plotsScore={plotsScore} />
					)}
				</div>
			</div>
		</>
	);
}

export default View;
