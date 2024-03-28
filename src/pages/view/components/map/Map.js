import { MapContainer, TileLayer, Popup, useMap, Polygon } from "react-leaflet";
import React from "react";
import styles from "./Map.module.scss";
import _ from "lodash";
import "leaflet/dist/leaflet.css";

function getPlotColor(value) {
	const hue = (1 - Math.min(1, Math.max(0, value))) * 120;
	const color = `hsl(${hue}, 100%, 50%)`;
	return color;
}

const MAP_PROVIDERS_LEGEND = {
	OPEN_STREET_MAP: "openstreetmap",
	CARTODB_LIGHT: "cartodb_light",
	CARTODB_DARK: "cartodb_dark",
};

const MAP_PROVIDERS = {
	[MAP_PROVIDERS_LEGEND.OPEN_STREET_MAP]:
		"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
	[MAP_PROVIDERS_LEGEND.CARTODB_LIGHT]:
		"https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
	[MAP_PROVIDERS_LEGEND.CARTODB_DARK]:
		"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
};

const DEFAULT_ZOOM = 3;

export default function Map({
	coords,
	mapProvider,
	jsonData,
	plotsScore,
	...props
}) {
	const { latitude, longitude } = coords;
	const MapView = () => {
		const map = useMap();
		map.setView([latitude, longitude], map.getZoom());
		return null;
	};
	return (
		<MapContainer
			className={styles.mapContainer}
			center={[latitude, longitude]}
			zoom={latitude && longitude ? 11 : DEFAULT_ZOOM}
			scrollWheelZoom={true}
		>
			<TileLayer url={MAP_PROVIDERS[mapProvider]} />;
			<MapView />
			{jsonData.map((plot) => {
				const plotScore = plotsScore.filter((item) => {
					return parseFloat(item.total).toFixed(2) === plot.totalValue.toFixed(2);
				})[0];
				return (
					<Polygon
						positions={plot.coordinates}
						pathOptions={{
							color: plot.totalValue
								? getPlotColor(1 - plot.totalValue)
								: `hsl(0, 100%, 50%)`,
						}}
					>
						<Popup>
							<div className={styles.zoneName}>{plot.name}</div>
							<div style={{ display: "flex", gap: "10px" }}>
								<div>
									<strong>Size: </strong> {plot.data.size} m<sup>2</sup>
									<br />
									<strong>Soil quality: </strong> {plot.data.soilQuality}
									<br />
									<strong>Elder People: </strong>{" "}
									{plot.data.elderPeoplePercentage}%,
									<br />
									<strong>Employed People: </strong>
									{plot.data.employedPeoplePercentage}%,
									<br />
									<strong>Budget: </strong>${plot.data.budget},
									<br />
									<strong>Plant Species: </strong>
									{plot.data.plantSpecies},
									<br />
									<strong>Interested Residents: </strong>
									{plot.data.interestedResidentsPercentage}%,
									<br />
									<strong>Shape Index: </strong>
									{plot.data.shapeIndex}
								</div>

								{!_.isEmpty(plotScore) && (
									<div>
										<strong>Urban: </strong> {plotScore.urban}
										<br />
										<strong>Spatial: </strong> {plotScore.spatial}
										<br />
										<strong>Ambiental Environment: </strong>
										{plotScore.environmental}
										<br />
										<strong>Economic: </strong> {plotScore.economic}
										<br />
										<strong>Politic: </strong> {plotScore.politic}
										<br />
										<strong>Social: </strong> {plotScore.social}
										<br />
										<strong>Total: </strong> {plotScore.total}
										<br />
									</div>
								)}
							</div>
						</Popup>
					</Polygon>
				);
			})}
		</MapContainer>
	);
}
