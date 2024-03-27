import React, { useRef } from "react";
import {
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	Typography,
	Slider,
	Button,
} from "@mui/material";
import styles from "./SideMenu.module.scss";
import { updateSliderValues } from "../../../../redux/actions/actions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
function SlidersMenu({
	mapProvider,
	setMapProvider,
	sliderValues,
	setSliderValues,
	viewType,
}) {
	const ref = useRef({
		urban: 0,
		spatial: 0,
		environmental: 0,
		economic: 0,
		social: 0,
		politic: 0,
	});
	const dispatch = useDispatch();
	const { t } = useTranslation();
	return (
		<div className={styles.menuWrapper}>
			<FormControl className={styles.sideMenuForm}>
				{viewType === "map" && (
					<div>
						<b>{t("mapType")}</b>
						<RadioGroup
							name="radio-buttons-group"
							onChange={(e) => {
								setMapProvider(e.target.value);
							}}
						>
							<FormControlLabel
								value="openstreetmap"
								control={<Radio />}
								label={t("normal")}
								checked={mapProvider === "openstreetmap"}
							/>

							<FormControlLabel
								value="cartodb_dark"
								control={<Radio />}
								label={t("dark")}
								checked={mapProvider === "cartodb_dark"}
							/>
							<FormControlLabel
								value="cartodb_light"
								control={<Radio />}
								label={t("light")}
								checked={mapProvider === "cartodb_light"}
							/>
						</RadioGroup>
					</div>
				)}
				<div>
					{viewType !== "map" && <br></br>}
					<div className={styles.sliderWrapper}>
						<Typography>{t("urban")}</Typography>
						<Slider
							defaultValue={sliderValues.urban}
							sx={{
								color: "#8A725D",
							}}
							onChange={(e) => {
								ref.current = { ...ref.current, urban: e.target.value };
							}}
						/>
						<Typography>{t("spatial")}</Typography>
						<Slider
							defaultValue={sliderValues.spatial}
							sx={{
								color: "#8BBE51",
							}}
							onChange={(e) => {
								ref.current = { ...ref.current, spatial: e.target.value };
							}}
						/>
						<Typography>{t("ambientalEnvironment")}</Typography>
						<Slider
							defaultValue={sliderValues.environmental}
							sx={{
								color: "#66B7D2",
							}}
							onChange={(e) => {
								ref.current = { ...ref.current, environmental: e.target.value };
							}}
						/>
						<Typography>{t("economic")}</Typography>
						<Slider
							defaultValue={sliderValues.economic}
							sx={{
								color: "#D4AF37",
							}}
							onChange={(e) => {
								ref.current = { ...ref.current, economic: e.target.value };
							}}
						/>
						<Typography>{t("politic")}</Typography>
						<Slider
							defaultValue={sliderValues.politic}
							sx={{
								color: "#E14A4A",
							}}
							onChange={(e) => {
								ref.current = { ...ref.current, politic: e.target.value };
							}}
						/>
						<Typography>{t("social")}</Typography>
						<Slider
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
							onClick={() => {
								setSliderValues(ref.current);
								dispatch(updateSliderValues(ref.current));
							}}
							className={styles.saveButton}
						>
							{t("save")}
						</Button>
					</div>
				</div>
			</FormControl>
		</div>
	);
}

export default SlidersMenu;
