import React, { useState } from "react";
import Header from "../../components/header/Header";
import VariablesAssigner from "./components/variables-assigner/VariablesAssigner";
import VariablesTable from "./components/filterable-table/VariablesTable";
import DataTable from "./components/data-table/DataTable";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Tools.module.scss";
import { Button } from "@mui/material";

function Tools() {
	const initialCategoryItems = useSelector((state) => state.categoryItems);
	const [categoryItems, setCategoryItems] = useState(initialCategoryItems);
	const [data, setData] = useState(useSelector((state) => state.jsonData));
	const initialVariables = useSelector((state) => state.variables);
	const [variables, setVariables] = useState(initialVariables);
	return (
		<div>
			<Header />
			{data.length > 0 ? (
				<div>
					<div className={styles.container}>
						<DataTable />
					</div>
					<div className={styles.wrapper}>
						<div className={styles.innerContainer}>
							<div className={styles.leftColumn}>
								<VariablesAssigner
									variables={variables}
									setVariables={setVariables}
									categoryItems={categoryItems}
									setCategoryItems={setCategoryItems}
								/>
							</div>
							<div className={styles.rightColumn}>
								<VariablesTable
									variables={variables}
									setVariables={setVariables}
									categoryItems={categoryItems}
								/>
							</div>
						</div>
					</div>
				</div>
			) : (
				<h1
					style={{
						display: "flex",
						flexDirection: 'column',
						height: "80vh",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					No data available
					<br />
					<Link to={"/u-garden-mct/"}>
						<Button variant="contained">Home</Button>
					</Link>
				</h1>
			)}
		</div>
	);
}

export default Tools;
