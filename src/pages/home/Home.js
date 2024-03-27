import React, { useState } from "react";
import {
	Button,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Input,
} from "@mui/material";
import Header from "../../components/header/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
	updateCategoryItems,
	updateJsonData,
	updateSliderValues,
	updateVariables,
} from "../../redux/actions/actions";
import exampleData from "./exampleData.json";
import styles from "./Home.module.scss";
import SaveIcon from "@mui/icons-material/Save";
import FolderIcon from "@mui/icons-material/Folder";

function Home() {
	const { t, i18n } = useTranslation();
	const changeLanguage = (language) => {
		i18n.changeLanguage(language);
	};
	const [appState, setAppState] = useState(useSelector((state) => state));
	const dispatch = useDispatch();
	const handleOpen = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const parsedData = JSON.parse(event.target.result);
					dispatch(updateVariables(parsedData.variables));
					dispatch(updateSliderValues(parsedData.sliderValues));
					dispatch(updateCategoryItems(parsedData.categoryItems));
					dispatch(updateJsonData(parsedData.jsonData));
					alert("JSON file imported successfuly");
				} catch (error) {
					alert("Invalid JSON file");
				}
			};
			reader.readAsText(file);
		}
	};
	const handleSave = (data) => {
		const jsonData = JSON.stringify(data, null, 2);
		const blob = new Blob([jsonData], { type: "application/json" });
		const a = document.createElement("a");
		const url = URL.createObjectURL(blob);
		a.href = url;
		a.download = "data.json";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
	const handleDownload = () => {
		const jsonBlob = new Blob([JSON.stringify(exampleData)], {
			type: "application/json",
		});
		const url = window.URL.createObjectURL(jsonBlob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "data.json";
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const parsedData = JSON.parse(event.target.result);
					const variables = Object.keys(parsedData[0].data).map((name) => ({
						name,
						inverted: false,
						available: true,
						deleted: false,
					}));
					dispatch(updateVariables(variables));
					dispatch(updateJsonData(parsedData));
					dispatch(
						updateCategoryItems({
							urban: [],
							spatial: [],
							environmental: [],
							economic: [],
							politic: [],
							social: [],
						})
					);
					alert("JSON file imported successfuly");
				} catch (error) {
					alert("Invalid JSON file");
				}
			};
			reader.readAsText(file);
		}
	};

	return (
		<div>
			<Header />
			<div className={styles.homeContent}>
				<div>
					<FormControl>
						<InputLabel>{t("language")}</InputLabel>
						<Select
							value={i18n.language}
							label="Language"
							onChange={(e) => {
								changeLanguage(e.target.value);
							}}
						>
							<MenuItem value={"en"}>English</MenuItem>
							<MenuItem value={"es"}>Spanish</MenuItem>
							<MenuItem value={"fr"}>French</MenuItem>
						</Select>
					</FormControl>
					<label htmlFor="openInput">
						<Button
							variant="contained"
							component="span"
							color="warning"
							className={styles.importButton}
							startIcon={<FolderIcon />}
						>
							{t("openProject")}
						</Button>
					</label>
					<Input
						type="file"
						accept=".json"
						onChange={handleOpen}
						style={{ display: "none" }}
						id="openInput"
					/>
					<Button
						onClick={() => {
							handleSave(appState);
						}}
						variant="contained"
						color="success"
						className={styles.importButton}
						startIcon={<SaveIcon />}
					>
							{t("saveProject")}
					</Button>
					<label htmlFor="jsonFileInput">
						<Button
							variant="contained"
							component="span"
							startIcon={<CloudUploadIcon />}
							className={styles.importButton}
						>
							{t("importData")}
						</Button>
					</label>
					<Input
						type="file"
						accept=".json"
						id="jsonFileInput"
						className={styles.jsonFileInput}
						onChange={handleFileChange}
					/>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<CloudDownloadIcon />}
						className={styles.importButton}
						onClick={handleDownload}
					>
							{t("fileExample")}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Home;
