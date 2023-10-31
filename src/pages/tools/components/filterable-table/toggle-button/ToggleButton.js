import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

function ToggleButton({ variableName, variables, setVariables }) {
	const [isActive, setIsActive] = useState(false);

	const handleToggle = () => {
		setIsActive(!isActive);
	};

	useEffect(() => {
		const parsedVariables = variables.map((item) => {
			return item.name === variableName
				? { ...item, inverted: isActive }
				: item;
		});
		setVariables(parsedVariables);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isActive]);
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
