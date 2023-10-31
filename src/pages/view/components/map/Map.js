import { MapContainer, TileLayer, Popup, useMap, Polygon } from "react-leaflet";
import React, { useState, useEffect } from "react";
import styles from './Map.module.scss'
import "leaflet/dist/leaflet.css";

function getColorForValue(value) {
	value = Math.min(1, Math.max(0, value));
	const hue = (1 - value) * 120;
	const color = `hsl(${hue}, 100%, 50%)`;
	return color;
}

export default function Map({
	coords,
	display_name,
	mapProvider,
	jsonData,
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
			style={{ height: "100%", border: "2px solid gray" }}
			center={[latitude, longitude]}
			zoom={12}
			scrollWheelZoom={true}
		>
			<TileLayer url={MAP_PROVIDERS[mapProvider]} attribution="" />;
			<MapView />
			{jsonData.map((item, index) => {
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
								<div className={styles.zoneName}>{item.name}</div>
								<strong>Size: </strong> {item.data.size} m<sup>2</sup>
								<br />
								<strong>Soil quality: </strong> {item.data.soilQuality}
								<br />
								<strong>Elder People: </strong> {item.data.elderPeoplePercentage}%,
								<br />
								<strong>Employed People: </strong>
								{item.data.employedPeoplePercentage}%,
								<br />
								<strong>Budget: </strong>
								${item.data.budget},
								<br />
								<strong>Plant Species: </strong>
								{item.data.plantSpecies},
								<br />
								<strong>Interested Residents: </strong>
								{item.data.interestedResidentsPercentage}%,
								<br />
								<strong>Shape Index: </strong>
								{item.data.shapeIndex}
							</div>
						</Popup>
					</Polygon>
				);
			})}
		</MapContainer>
	);
}
