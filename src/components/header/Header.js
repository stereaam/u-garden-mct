import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	ListItem,
	Box,
	Divider,
	List,
	ListItemButton,
	ListItemText,
	IconButton,
	Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Header() {
	const { t } = useTranslation();
	const navItems = [t("home"), t("view"), t("tools"), t("help")];
	const drawer = (
		<Box onClick={() => {}} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				MUI
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
	return (
		<div>
			<AppBar position="static" color="success">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={() => {}}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						U-GARDEN Multi-Criteria Tool
					</Typography>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{navItems.map((item) => (
							<Link
								to={
									item === t("home")
										? "/u-garden-mct/"
										: "/u-garden-mct/" + item.toLowerCase()
								}
							>
								<Button key={item} sx={{ color: "#fff" }}>
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
