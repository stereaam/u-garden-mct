import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../icons/u-garden.PNG";
import styles from "./Header.module.scss";

function Header() {
	const { t } = useTranslation();

	const navItems = [t("home"), t("view"), t("tools"), t("help")];
	return (
		<div>
			<AppBar position="static" color="success">
				<Toolbar>
					<div
						className={styles.title}
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<img
							src={logo}
							alt="logo"
							style={{
								width: "50px",
							}}
						/>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<div>U-GARDEN</div>
							<div>{t("multiCriteriaTool")}</div>
						</div>
					</div>

					<Box>
						{navItems.map((item) => (
							<Link
								to={
									item === t("home")
										? "/u-garden-mct/"
										: "/u-garden-mct/" + item.toLowerCase()
								}
							>
								<Button key={item}>
									<div className={styles.navItem}>{item}</div>
								</Button>
							</Link>
						))}
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Header;
