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
import { useTranslation } from "react-i18next";
function Home() {
	const [jsonData, setJsonData] = useState({});
	const { t, i18n } = useTranslation();
	const changeLanguage = (language) => {
		i18n.changeLanguage(language);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const parsedData = JSON.parse(event.target.result);
					console.log(parsedData);
					setJsonData(parsedData);
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
			<div className="home-content">
				<div>
					<h1>{t('settings')}</h1>
					<FormControl variant="filled" sx={{ m: 2, minWidth: 120 }}>
						<InputLabel id="demo-simple-select-standard-label">
							{t("language")}
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
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

					<Input
						type="file"
						accept=".json"
						id="jsonFileInput"
						style={{ display: "none" }}
						onChange={handleFileChange}
					/>
					<label htmlFor="jsonFileInput">
						<Button
							variant="contained"
							component="span"
							startIcon={<CloudUploadIcon />}
							sx={{ width: "260px" }}
						>
							{t("importSpatialData")}
						</Button>
					</label>
					{/* <Input
						type="file"
						accept=".json"
						id="jsonFileInput2"
						style={{ display: "none" }}
						onChange={handleFileChange}
					/>
					<label htmlFor="jsonFileInput2">
						<Button
							variant="contained"
							component="span"
							startIcon={<CloudUploadIcon />}
							sx={{ width: "260px" }}
						>
							{t("importNonSpatialData")}
						</Button>
					</label> */}
				</div>
			</div>
		</div>
	);
}

export default Home;
