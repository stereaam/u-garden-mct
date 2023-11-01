import React, { useState } from "react";
import Header from "../../components/header/Header";
import VariablesAssigner from "./components/variables-assigner/VariablesAssigner";
import FilterableTable from "./components/filterable-table/FilterableTable";
import DataTable from "./components/data-table/DataTable";
import { useSelector } from "react-redux";
import styles from "./Tools.module.scss";

function Tools() {
	// const jsonData = useSelector((state) => state.jsonData)[0]?.data || {};
	const initialCategoryItems = useSelector((state) => state.categoryItems);
	const [categoryItems, setCategoryItems] = useState(initialCategoryItems);

	// const variableNames = Object.keys(jsonData);
	// const initialVariables =
	// 	variableNames.length > 0
	// 		? variableNames.map((name) => ({
	// 				name,
	// 				inverted: false,
	// 				available: true,
	// 				deleted: false,
	// 		  }))
	// 		: [];
	const initialVariables = useSelector((state) => state.variables);
	const [variables, setVariables] = useState(initialVariables);
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
							categoryItems={categoryItems}
							setCategoryItems={setCategoryItems}
						/>
					</div>
					<div className={styles.rightColumn}>
						<FilterableTable
							variables={variables}
							setVariables={setVariables}
							categoryItems={categoryItems}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Tools;
