import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import your Redux store
import CssBaseline from "@mui/material/CssBaseline";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createTheme } from "@mui/material/styles";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<I18nextProvider i18n={i18n}>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<DndProvider backend={HTML5Backend}>
						<Provider store={store}>
							<App />
						</Provider>
					</DndProvider>
				</BrowserRouter>
			</ThemeProvider>
		</React.StrictMode>
	</I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
