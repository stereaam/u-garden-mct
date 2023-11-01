import React, { useState, useRef } from "react";
import {
	FormControl,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Radio,
	Typography,
	Slider,
	Button,
} from "@mui/material";

function Menu({
	mapProvider,
	setMapProvider,
	sliderValues,
	setSliderValues,
	selectedOption,
}) {
	const ref = useRef({
		urban: 0,
		spatial: 0,
		environmental: 0,
		economic: 0,
		social: 0,
		politic: 0,
	});
	return (
		<div className="menu">
			<FormControl sx={{ width: "100%", padding: "20px" }}>
				{selectedOption === "map" && (
					<div>
						<FormLabel id="demo-radio-buttons-group-label">Map Type</FormLabel>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
							onChange={(e) => {
								setMapProvider(e.target.value);
							}}
						>
							<FormControlLabel
								value="openstreetmap"
								control={<Radio />}
								label="Normal"
								checked={mapProvider === "openstreetmap"}
							/>

							<FormControlLabel
								value="cartodb_dark"
								control={<Radio />}
								label="Dark"
								checked={mapProvider === "cartodb_dark"}
							/>
							<FormControlLabel
								value="cartodb_light"
								control={<Radio />}
								label="Light"
								checked={mapProvider === "cartodb_light"}
							/>
						</RadioGroup>
					</div>
				)}
				<div className="slider-wrapper">
					<Typography gutterBottom>Urban</Typography>
					<Slider
						valueLabelDisplay="auto"
						aria-label="custom thumb label"
						defaultValue={sliderValues.urban}
						sx={{
							color: "#8A725D",
							width: "100%",
						}}
						onChange={(e) => {
							ref.current = { ...ref.current, urban: e.target.value };
						}}
					/>
					<Typography gutterBottom>Spatial</Typography>
					<Slider
						valueLabelDisplay="auto"
						aria-label="custom thumb label"
						defaultValue={sliderValues.spatial}
						sx={{
							color: "#8BBE51",
						}}
						onChange={(e) => {
							ref.current = { ...ref.current, spatial: e.target.value };
						}}
					/>
					<Typography gutterBottom>Ambiental environment</Typography>
					<Slider
						valueLabelDisplay="auto"
						aria-label="custom thumb label"
						defaultValue={sliderValues.environmental}
						sx={{
							color: "#66B7D2",
						}}
						onChange={(e) => {
							ref.current = { ...ref.current, environmental: e.target.value };
						}}
					/>
					<Typography gutterBottom>Economic</Typography>
					<Slider
						valueLabelDisplay="auto"
						aria-label="custom thumb label"
						defaultValue={sliderValues.economic}
						sx={{
							color: "#D4AF37",
						}}
						onChange={(e) => {
							ref.current = { ...ref.current, economic: e.target.value };
						}}
					/>
					<Typography gutterBottom>Politic</Typography>
					<Slider
						valueLabelDisplay="auto"
						aria-label="custom thumb label"
						defaultValue={sliderValues.politic}
						sx={{
							color: "#E14A4A",
						}}
						onChange={(e) => {
							ref.current = { ...ref.current, politic: e.target.value };
						}}
					/>
					<Typography gutterBottom>Social</Typography>
					<Slider
						valueLabelDisplay="auto"
						aria-label="custom thumb label"
						defaultValue={sliderValues.social}
						sx={{
							color: "#FFA07A",
						}}
						onChange={(e) => {
							ref.current = { ...ref.current, social: e.target.value };
						}}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							setSliderValues(ref.current);
						}}
						sx={{ width: "100%", marginTop: "50px" }}
					>
						Save
					</Button>
				</div>
			</FormControl>
		</div>
	);
}

export default Menu;
