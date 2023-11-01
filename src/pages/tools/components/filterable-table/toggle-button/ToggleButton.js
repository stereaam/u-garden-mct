import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

function ToggleButton({ variableName, variables, setVariables }) {
	const [isActive, setIsActive] = useState(
		variables.filter((variable) => variable.name === variableName)[0].inverted
	);

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
			disabled={
				!variables.filter((variable) => variable.name === variableName)[0]
					.available
			}
		>
			Invert
		</Button>
	);
}

export default ToggleButton;
