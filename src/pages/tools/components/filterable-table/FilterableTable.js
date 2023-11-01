import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Button,
} from "@mui/material";
import "./FilterableTable.css";
import ToggleButton from "./toggle-button/ToggleButton";
// import IconButton from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";

function camelCaseToWords(camelCaseString) {
	const words = camelCaseString.split(/(?=[A-Z])/);
	const formattedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	return formattedWords.join(" ");
}

function FilterableTable({ variables, setVariables }) {
	const [filter, setFilter] = useState("");
	const [filteredData, setFilteredData] = useState(variables);

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
		setFilteredData(
			variables.filter((item) =>
				item.name.toLowerCase().includes(event.target.value.toLowerCase())
			)
		);
	};
	const handleClearFilter = () => {
		setFilter("");
		setFilteredData(variables);
	};

	return (
		<div className="filterable-container">
			{/* <div className="filterable-controls">
				<TextField
					label="Filter by Name"
					value={filter}
					onChange={handleFilterChange}
					className="filterable-textfield"
				/>
				<Button
					variant="outlined"
					className="filterable-button"
					onClick={handleClearFilter}
				>
					Clear Filter
				</Button>
			</div> */}
			<TableContainer className="filterable-table-container" component={Paper}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell className="filterable-table-head">
								<strong>Name</strong>
							</TableCell>
							<TableCell className="filterable-table-head">
								<strong>Actions</strong>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.map((item) => (
							<TableRow>
								<TableCell>{camelCaseToWords(item.name)}</TableCell>
								<TableCell sx={{ width: "250px" }}>
									<ToggleButton
										variableName={item.name}
										variables={variables}
										setVariables={setVariables}
										className="filterable-toggle-button"
										sx={{ m: 1 }}
									/>
									{!variables.filter(
										(variable) => variable.name === item.name
									)[0].deleted ? (
										<Button
											variant="contained"
											color="error"
											className="filterable-delete-button"
											sx={{ m: 1 }}
											disabled={
												!variables.filter(
													(variable) => variable.name === item.name
												)[0].available
											}
											onClick={() => {
												setVariables((prev) => {
													return prev.map((variable) => {
														return variable.name === item.name
															? { ...variable, deleted: true }
															: variable;
													});
												});
											}}
										>
											Delete
										</Button>
									) : (
										<Button
											variant="contained"
											color="success"
											className="filterable-delete-button"
											sx={{ m: 1 }}
											disabled={
												!variables.filter(
													(variable) => variable.name === item.name
												)[0].available
											}
											onClick={() => {
												setVariables((prev) => {
													return prev.map((variable) => {
														return variable.name === item.name
															? { ...variable, deleted: false }
															: variable;
													});
												});
											}}
										>
											<UndoIcon />
										</Button>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default FilterableTable;
