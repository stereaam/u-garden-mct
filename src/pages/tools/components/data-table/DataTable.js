import React, { useState, useEffect, useRef } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./DataTable.module.scss";
import { useDispatch } from "react-redux";
import { updateJsonData } from '../../../../redux/actions/actions';

function camelCaseToTitleCase(camelCase) {
	const withSpaces = camelCase.replace(/([A-Z])/g, " $1").trim();
	return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

// function validateInput(input) {
// 	// Define a regular expression pattern to match the format "test=test2"
// 	const pattern = /^[A-Za-z0-9_-]+=[A-Za-z0-9_-]+$/;

// 	// Use the test() method to check if the input matches the pattern
// 	return pattern.test(input);
// }

function DataTable() {
	const dispatch = useDispatch();
	const [data, setData] = useState(useSelector((state) => state.jsonData));
	const handleDelete = (name) => {
		const filtereData = data.filter((item) => item.name !== name);
		setData(filtereData);
		dispatch(updateJsonData(filtereData));
	};
	// const [savedFilters, setSavedFilter] = useState([]);
	// const [filter, setFilter] = useState("");
	// const [filteredData, setFilteredData] = useState([...data]);
	// const [errorMessage, setErrorMessage] = useState("");

	// const filterInputRef = useRef(null);

	// function filterData(data, filters) {
	// 	const filteredData = data.filter((item) => {
	// 		return filters.every((filter) => {
	// 			const [property, value] = filter.split("=");
	// 			console.log(property, value);
	// 			const numericValue = !isNaN(Number(value)) ? Number(value) : value;
	// 			return item[property] === numericValue;
	// 		});
	// 	});
	// 	setFilteredData(filteredData);
	// }

	// const handleFilterChange = (event) => {
	// 	const filterValue = event.target.value;
	// 	setFilter(filterValue);
	// };

	// const saveFilter = () => {
	// 	if (validateInput(filter)) {
	// 		setSavedFilter([...savedFilters, filter]);
	// 		setFilter("");
	// 		setErrorMessage("");
	// 	} else {
	// 		setErrorMessage('Invalid filter. Ex: "Size=10000"');
	// 	}
	// };

	// const handleClearFilter = () => {
	// 	setFilter("");
	// 	setSavedFilter([]);
	// 	setFilteredData(data);
	// 	filterInputRef.current.focus(); // Maintain focus on the input after clearing
	// };

	// const handleKeyPress = (event) => {
	// 	if (event.key === "Enter") {
	// 		event.preventDefault(); // Prevent form submission
	// 		saveFilter();
	// 		filterInputRef.current.focus(); // Maintain focus on the input after pressing Enter
	// 	}
	// };

	// useEffect(() => {
	// 	filterData(data, savedFilters);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [savedFilters]);
	return (
		<div className={styles.dataTableContainer}>
			{/* <div className="filterContainer">
				<div className="filterInput">
					<TextField
						label="Filter by Name, Size or other columns"
						value={filter}
						onChange={handleFilterChange}
						onKeyDown={handleKeyPress}
						inputRef={filterInputRef}
						sx={{ width: "400px" }}
					/>
					<Button
						variant="outlined"
						sx={{ height: "45px", padding: "5px 10px" }}
						onClick={handleClearFilter}
					>
						Clear Filter
					</Button>
				</div>
				<div style={{ color: "red" }}>{errorMessage}</div>
				{savedFilters.length > 0 && (
					<div style={{ marginTop: "10px" }}>
						<strong style={{ fontSize: "15px" }}>Applied Filters</strong>
						<div className="filterBox">
							{savedFilters.map((item) => (
								<div className="filterBoxItem">{item}</div>
							))}
						</div>
					</div>
				)}
			</div> */}
			<Paper elevation={3} className={styles.tablePaper}>
				<TableContainer className={styles.tableContainer}>
					<Table>
						<TableHead>
							<TableRow>
								{["Name", ...Object.keys(data[0]?.data || {}), ""].map(
									(item) => {
										return (
											<TableCell>
												<div className="tableHeadCell">
													{camelCaseToTitleCase(item)}
												</div>
											</TableCell>
										);
									}
								)}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.length > 0 ? (
								data.map((item) => (
									<TableRow key={item.id}>
										<TableCell>{item.name}</TableCell>
										{Object.keys(item.data).map((key) => (
											<TableCell>{item.data[key]}</TableCell>
										))}
										<TableCell className={styles.deleteButton}>
											<Button
												variant="contained"
												color="error"
												onClick={() => handleDelete(item.name)}
											>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={2}>
										<Typography variant="h6" align="center">
											No Data Available
										</Typography>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</div>
	);
}

export default DataTable;
