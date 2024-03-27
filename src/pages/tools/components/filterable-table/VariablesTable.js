import React from "react";
import _ from "lodash";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import styles from "./VariablesTable.module.scss";
import ToggleButton from "./toggle-button/ToggleButton";
import { useTranslation } from "react-i18next";
import UndoIcon from "@mui/icons-material/Undo";

function camelCaseToWords(camelCaseString) {
	const words = camelCaseString.split(/(?=[A-Z])/);
	const formattedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	return formattedWords.join(" ");
}

function FilterableTable({ variables, setVariables }) {
	const { t } = useTranslation();
	return (
		<div className={styles.tableWrapper}>
			<Box className={styles.box}>
				<DataGrid
					rows={variables.map((item) => {
						return { id: _.uniqueId(), name: camelCaseToWords(item.name) };
					})}
					columns={[
						{
							field: "name",
							headerName: <strong>{t("name")}</strong>,
							flex: 1,
						},
						{
							field: "actions",
							type: "actions",
							headerName: <strong>{t("actions")}</strong>,
							getActions: (item) => {
								return [
									<ToggleButton
										variableName={item.row.name}
										variables={variables}
										setVariables={setVariables}
										camelCaseToWords={camelCaseToWords}
									/>,
									...(variables.filter(
										(variable) =>
											camelCaseToWords(variable.name) === item.row.name
									)[0]?.deleted
										? [
												<GridActionsCellItem
													icon={<UndoIcon color="success" />}
													label="Undo"
													onClick={() =>
														setVariables((prev) =>
															prev.map((variable) =>
																camelCaseToWords(variable.name) ===
																item.row.name
																	? { ...variable, deleted: false }
																	: variable
															)
														)
													}
												/>,
										  ]
										: [
												<GridActionsCellItem
													icon={<DeleteIcon color="error" />}
													label="Delete"
													onClick={() =>
														setVariables((prev) =>
															prev.map((variable) =>
																camelCaseToWords(variable.name) ===
																item.row.name
																	? { ...variable, deleted: true }
																	: variable
															)
														)
													}
													disabled={
														!variables.filter(
															(variable) =>
																camelCaseToWords(variable.name) ===
																item.row.name
														)[0].available
													}
												/>,
										  ]),
								];
							},
							flex: 1,
						},
					]}
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
			</Box>
		</div>
	);
}

export default FilterableTable;
