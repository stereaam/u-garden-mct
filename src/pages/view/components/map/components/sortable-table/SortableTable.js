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
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	console.log(parsedCategoryValues);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	const handleSort = (columnId) => {
		if (orderBy === columnId) {
			setOrder(order === "asc" ? "desc" : "asc");
		} else {
			setOrderBy(columnId);
			setOrder("asc");
		}
	};

	// Calculate the start and end index for slicing the data based on page and rowsPerPage
	const startIndex = page * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;
	const slicedData = parsedCategoryValues.slice(startIndex, endIndex);

	// Sort the sliced data
	const sortedData = slicedData.sort((a, b) => {
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
			<Table stickyHeader>
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
			<TablePagination
				sx={{
					position: "sticky",
					bottom: 0,
					zIndex: 1, // Adjust the z-index as needed
					background: "white", // Add a background color if needed
				}}
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={parsedCategoryValues.length} // Use the original data length
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
}

export default SortableTable;
