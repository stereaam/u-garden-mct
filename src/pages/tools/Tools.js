import React, { useState } from "react";
import Header from "../../components/header/Header";
import VariablesAssigner from "./components/variables-assigner/VariablesAssigner";
import FilterableTable from "./components/filterable-table/FilterableTable";
import DataTable from "./components/data-table/DataTable";
import { useSelector } from "react-redux";
import styles from "./Tools.module.scss";

function Tools() {
	const [variables, setVariables] = useState(
		Object.keys(useSelector((state) => state.jsonData)[0])
			.filter((item) => item !== "coordinates")
			.map((item) => {
				return { name: item, inverted: false, available: true, deleted: false };
			})
	);

	return (
		<div>
			<Header />
			<div className={styles.container}>
				<DataTable />
			</div>
			<div className={styles.wrapper}>
				<div className={styles.innerContainer}>
					<div className={styles.leftColumn}>
						<VariablesAssigner
							variables={variables}
							setVariables={setVariables}
						/>
					</div>
					<div className={styles.rightColumn}>
						<FilterableTable
							variables={variables}
							setVariables={setVariables}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Tools;
