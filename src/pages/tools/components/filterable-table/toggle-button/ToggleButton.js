import React, { useState } from "react";
import { Button } from "@mui/material";

function ToggleButton({
	variableName,
	variables,
	setVariables,
	camelCaseToWords,
}) {
	const [isActive, setIsActive] = useState(
		variables.filter(
			(variable) => camelCaseToWords(variable.name) === variableName
		)[0].inverted
	);

	const handleToggle = () => {
		const parsedVariables = variables.map((variable) => {
			return camelCaseToWords(variable.name) === variableName
				? { ...variable, inverted: !isActive }
				: variable;
		});
		setVariables(parsedVariables);
		setIsActive((prev) => !prev);
	};

	return (
		<Button
			variant={isActive ? "contained" : "outlined"}
			color={"primary"}
			onClick={handleToggle}
			disabled={
				!variables.filter(
					(variable) => camelCaseToWords(variable.name) === variableName
				)[0].available
			}
		>
			Invert
		</Button>
	);
}

export default ToggleButton;
