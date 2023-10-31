import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableSortLabel,
	TablePagination,
} from "@mui/material";

const columns = [
	{ id: "name", label: "Name" },
	{ id: "urban", label: "Urban" },
	{ id: "spatial", label: "Spatial" },
	{ id: "environmental", label: "Ambiental Environment" },
	{ id: "economic", label: "Economic" },
	{ id: "politic", label: "Politic" },
	{ id: "social", label: "Social" },
	{ id: "total", label: "Total" },
];

function SortableTable({ parsedCategoryValues }) {

	const [orderBy, setOrderBy] = useState("");
	const [order, setOrder] = useState("asc");

	const handleSort = (columnId) => {
		if (orderBy === columnId) {
			setOrder(order === "asc" ? "desc" : "asc");
		} else {
			setOrderBy(columnId);
			setOrder("asc");
		}
	};


	const sortedData = parsedCategoryValues.sort((a, b) => {
		const aValue = a[orderBy];
		const bValue = b[orderBy];

		if (order === "asc") {
			return aValue - bValue;
		} else {
			return bValue - aValue;
		}
	});

	return (
		<TableContainer component={Paper} sx={{ height: "100%" }}>
			<Table stickyHeader sx={{ height: "100%" }}>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell
								sx={{ fontWeight: "bold", fontSize: "17px" }}
								key={column.id}
							>
								<TableSortLabel
									active={orderBy === column.id}
									direction={orderBy === column.id ? order : "asc"}
									onClick={() => handleSort(column.id)}
								>
									{column.label}
								</TableSortLabel>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{sortedData.map((row, index) => (
						<TableRow key={index}>
							{columns.map((column) => (
								<TableCell key={column.id}>{row[column.id]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default SortableTable;
