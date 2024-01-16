import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";

function Header() {
	const { t } = useTranslation();
	const navItems = [t("home"), t("view"), t("tools"), t("help")];
	return (
		<div>
			<AppBar position="static" color="success">
				<Toolbar>
					<div className={styles.title}>U-GARDEN MULTI-CRITERIA TOOL</div>
					<Box>
						{navItems.map((item) => (
							<Link
								to={
									item === t("home")
										? "/u-garden-mct/"
										: "/u-garden-mct/" + item.toLowerCase()
								}
							>
								<Button key={item} className={styles.navItem}>
									{item}
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
