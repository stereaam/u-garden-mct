import { MapContainer, TileLayer, Popup, useMap, Polygon } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";


function getColorForValue(value) {
	value = Math.min(1, Math.max(0, value));
	const hue = (1 - value) * 120;
	const color = `hsl(${hue}, 100%, 50%)`;
	console.log("color", color);
	return color;
}

export default function Map({
	coords,
	display_name,
	mapProvider,
	jsonData,
	categoryValues,
	sliderValues,
	parsedData,
	...props
}) {
	const MAP_PROVIDERS_LEGEND = {
		OPEN_STREET_MAP: "openstreetmap",
		STAMEN_WATERCOLOR: "stamen_watercolor",
		STAMEN_TERRAIN: "stamen_terrain",
		STAMEN_TONER: "stamen_toner",
		CARTODB_LIGHT: "cartodb_light",
		CARTODB_DARK: "cartodb_dark",
	};

	const MAP_PROVIDERS = {
		[MAP_PROVIDERS_LEGEND.OPEN_STREET_MAP]:
			"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		[MAP_PROVIDERS_LEGEND.STAMEN_WATERCOLOR]:
			"http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
		[MAP_PROVIDERS_LEGEND.STAMEN_TERRAIN]:
			"http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
		[MAP_PROVIDERS_LEGEND.STAMEN_TONER]:
			"http://tile.stamen.com/toner/{z}/{x}/{y}.jpg",
		[MAP_PROVIDERS_LEGEND.CARTODB_LIGHT]:
			"https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
		[MAP_PROVIDERS_LEGEND.CARTODB_DARK]:
			"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
	};

	const { latitude, longitude } = coords;

	const MapView = () => {
		const map = useMap();
		map.setView([latitude, longitude], map.getZoom());
		return null;
	};

	return (
		<MapContainer
			style={{ height: "100%", border: '2px solid gray' }}
			center={[latitude, longitude]}
			zoom={12}
			scrollWheelZoom={true}
		>
			<TileLayer url={MAP_PROVIDERS[mapProvider]} attribution="" />;
			<MapView />
			{parsedData.map((item, index) => {
				return (
					<Polygon
						positions={item.coordinates}
						pathOptions={{
							color: item.totalValue
								? getColorForValue(1 - item.totalValue)
								: `hsl(0, 100%, 50%)`,
						}}
					>
						<Popup>
							<div>
								<strong>Area Information</strong>
								<br />
								Size: {jsonData[index].size} m<sup>2</sup>
								<br />
								Soil quality: {item.soilQuality}
								<br />
								Elder People: {item.elderPeoplePercentage.toFixed(2)} %,
								<br />
								Employed People:{item.employedPeoplePercentage.toFixed(2)} %,
								<br />
								Budget:{item.budget},
								<br />
								Plant Species:{item.plantSpecies},
								<br />
								Interested Residents:{" "}
								{item.interestedResidentsPercentage.toFixed(2)} %,
								<br />
								Shape Index:{item.shapeIndex},
							</div>
						</Popup>
					</Polygon>
				);
			})}
		</MapContainer>
	);
}
