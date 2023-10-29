import React from "react";
import "./GradientLegend.css";

function GradientLegend() {
	const numStops = 10;

	// Create an array of gradient stops with labels
	const gradientStops = Array.from({ length: numStops }, (_, index) => {
		const value = (index / (numStops - 1)).toFixed(1); // Calculate the value from 0 to 1
		return { label: value };
	});

	// Define a CSS style with a horizontal linear gradient background
	const gradientStyle = {
		background: `linear-gradient(to right, red, orange, yellow, green)`,
		width: "100%", // Set the width to 100% for a horizontal gradient
		height: "20px", // Adjust the height as needed
	};

	return (
		<div>
			<strong>Total Score</strong>
			<div className="gradient-legend" style={gradientStyle}>
				<div className="gradient-colors"></div>
				<div className="gradient-labels">
					{gradientStops.map((stop, index) => (
						<div key={index} className="gradient-label">
							{stop.label}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default GradientLegend;
