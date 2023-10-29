import React from "react";

import Home from "./pages/home/Home";
import View from "./pages/view/View";
import Tools from "./pages/tools/Tools";
import Help from "./pages/help/Help";
import { Route, Routes, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";

function App() {
	const { t } = useTranslation();
	const viewPath = `/${t("view")}`;
	const toolsPath = `/${t("tools")}`;
	const helpPath = `/${t("help")}`;
	return (
		<div className="App">
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path={viewPath} element={<View />} />
				<Route path={toolsPath} element={<Tools />} />
				<Route path={helpPath} element={<Help />} />
				 <Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
}

export default App;
