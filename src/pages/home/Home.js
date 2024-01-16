import React from "react";
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
import {
	updateCategoryItems,
	updateJsonData,
	updateVariables,
} from "../../redux/actions/actions";
import exampleData from "./exampleData.json";
import styles from "./Home.module.scss";

function Home() {
	const { t, i18n } = useTranslation();
	const changeLanguage = (language) => {
		i18n.changeLanguage(language);
	};

	const dispatch = useDispatch();

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
					console.log(event.target.result);
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
					<label htmlFor="jsonFileInput">
						<Button
							variant="contained"
							component="span"
							startIcon={<CloudUploadIcon />}
							className={styles.importButton}
						>
							{t("importSpatialData")}
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
						variant="outlined"
						color="secondary"
						startIcon={<CloudDownloadIcon />}
						className={styles.importButton}
						onClick={handleDownload}
					>
						Download example JSON
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Home;
