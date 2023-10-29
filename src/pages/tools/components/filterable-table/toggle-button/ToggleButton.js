import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

function ToggleButton({ variableName, setVariables }) {
	const [isActive, setIsActive] = useState(false);

	const handleToggle = () => {
		setIsActive(!isActive);
	};

	useEffect(() => {
		setVariables((prev) =>
			prev.map((item) =>
				item.name === variableName ? { ...item, inverted: isActive } : item
			)
		);
	}, [isActive, setVariables, variableName]);

	return (
		<Button
			variant={isActive ? "contained" : "outlined"}
			color={"primary"}
			onClick={handleToggle}
		>
			Invert
		</Button>
	);
}

export default ToggleButton;
