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
	const viewPath = `/u-garden-mct/${t("view")}`;
	const toolsPath = `/u-garden-mct/${t("tools")}`;
	const helpPath = `/u-garden-mct/${t("help")}`;
	return (
		<div className="App">
			<Routes>
				<Route path="/u-garden-mct/" exact element={<Home />} />
				<Route path={viewPath} element={<View />} />
				<Route path={toolsPath} element={<Tools />} />
				<Route path={helpPath} element={<Help />} />
				<Route path="*" element={<Navigate to="/u-garden-mct" />} />
			</Routes>
		</div>
	);
}

export default App;
