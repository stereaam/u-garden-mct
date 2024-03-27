import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import styles from "./ScoreTable.module.scss";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import _ from "lodash";

function SortableTable({ plotsScore }) {
	const { t } = useTranslation();
	const columns = [
		{ field: "name", headerName: <b>{t("name")}</b>, flex: 1 },
		{ field: "urban", headerName: <b>{t("urban")}</b>, flex: 1 },
		{ field: "spatial", headerName: <b>{t("spatial")}</b>, flex: 1 },
		{
			field: "environmental",
			headerName: <b>{t("ambientalEnvironment")}</b>,
			flex: 1,
		},
		{ field: "economic", headerName: <b>{t("economic")}</b>, flex: 1 },
		{ field: "politic", headerName: <b>{t("politic")}</b>, flex: 1 },
		{ field: "social", headerName: <b>{t("social")}</b>, flex: 1 },
		{ field: "total", headerName: <b>{t("total")}</b>, flex: 1 },
	];
	return (
		<DataGrid
			rows={plotsScore.map((item) => {
				return { id: _.uniqueId(), ...item };
			})}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 10,
					},
				},
			}}
			pageSizeOptions={[10]}
			disableRowSelectionOnClick
		/>
	);
}

export default SortableTable;
