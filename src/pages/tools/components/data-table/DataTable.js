import React, { useState } from "react";
import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import _ from "lodash";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { updateJsonData } from "../../../../redux/actions/actions";
import { useTranslation } from "react-i18next";
function camelCaseToTitleCase(camelCase) {
	const withSpaces = camelCase.replace(/([A-Z])/g, " $1").trim();
	return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}
const DeleteConfirmationModal = ({ open, handleClose, handleDelete }) => {
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Are you sure you want to delete this?</DialogTitle>
			<DialogContent></DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="secondary" variant="info">
					Cancel
				</Button>
				<Button
					onClick={handleDelete}
					color="error"
					variant="contained"
					autoFocus
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};
function DataTable() {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [data, setData] = useState(useSelector((state) => state.jsonData));
	const handleDelete = (name) => {
		console.log(name);
		const filtereData = data.filter((item) => item.name !== name);
		setData(filtereData);
		dispatch(updateJsonData(filtereData));
	};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [item, setItem] = useState({});
	const rows = data.map((item) => {
		return {
			id: _.uniqueId(),
			[t("name")]: item.name,
			...item.data,
		};
	});
	const columns = (
		data.length > 0
			? [t("name"), ...Object.keys(data[0].data), t("actions")]
			: []
	).map((item) => {
		if (item === t("actions")) {
			return {
				field: "actions",
				type: "actions",
				headerName: <strong>{t("actions")}</strong>,
				getActions: (item) => {
					return [
						<GridActionsCellItem
							icon={<DeleteIcon />}
							label="Delete"
							onClick={() => {
								setIsModalOpen(true);
								setItem(item);
							}}
							color="inherit"
						/>,
					];
				},
				flex: 1,
			};
		}
		return {
			field: item,
			headerName: <strong>{camelCaseToTitleCase(item)}</strong>,
			flex: 1,
		};
	});
	return (
		<Box sx={{ height: 500, width: "90%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5]}
				disableRowSelectionOnClick
			/>
			<DeleteConfirmationModal
				open={isModalOpen}
				handleClose={() => {
					setIsModalOpen(false);
				}}
				handleDelete={() => {
					console.log(item);
					handleDelete(item.row[t("name")]);
					setIsModalOpen(false);
				}}
			/>
		</Box>
	);
}

export default DataTable;
