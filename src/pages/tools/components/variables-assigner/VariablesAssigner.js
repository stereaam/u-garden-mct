import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./VariablesAssigner.module.scss";

function camelCaseToWords(camelCaseString) {
	const words = camelCaseString.split(/(?=[A-Z])/);

	const formattedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);

	return formattedWords.join(" ");
}

const DraggableItem = ({ name, inverted, available }) => {
	const [, ref] = useDrag({
		type: "item",
		item: { name, inverted, available },
	});
	return (
		<Box ref={ref} className={styles.draggableItem}>
			{camelCaseToWords(name)}
		</Box>
	);
};

const BACKGROUND_COLOR = {
	urban: "#A0927E",
	spatial: "#8BBE51",
	environmental: "#66B7D2",
	economic: "#D4AF37",
	politic: "#E14A4A",
	social: "#FFA07A",
};

const DropBox = ({
	title,
	accept,
	onDrop,
	items,
	setCategoryItems,
	setAvailableVariables,
}) => {
	const [, ref] = useDrop({
		accept,
		drop: (item) => onDrop(item),
	});

	return (
		<div className={styles.dropBoxWrapper}>
			<h3>{camelCaseToWords(title)}</h3>
			<Box className={styles.dropBox} ref={ref}>
				<List>
					{items.map((item, index) => (
						<ListItem
							key={index}
							sx={{ backgroundColor: BACKGROUND_COLOR[title] }}
							className={styles.listItem}
						>
							<ListItemText
								primary={<strong>{camelCaseToWords(item.name)}</strong>}
							/>
							<IconButton
								onClick={() => {
									setCategoryItems((prev) => {
										return {
											...prev,
											[title]: prev[title].filter(
												(categoryItem) => categoryItem.name !== item.name
											),
										};
									});
									setAvailableVariables((prev) => {
										return prev.map((variable) => {
											if (variable.name === item.name) {
												return { ...variable, available: true };
											} else {
												return variable;
											}
										});
									});
								}}
							>
								<CloseIcon />
							</IconButton>
						</ListItem>
					))}
				</List>
			</Box>
		</div>
	);
};

const VariablesAssigner = ({ variables, setVariables }) => {
	const [categoryItems, setCategoryItems] = useState({
		urban: [],
		spatial: [],
		environmental: [],
		economic: [],
		politic: [],
		social: [],
	});

	const handleDrop = (boxTitle, droppedItem) => {
		setVariables(
			variables.map((item) =>
				item.name === droppedItem.name ? { ...item, available: false } : item
			)
		);
		setCategoryItems((prev) => {
			return { ...prev, [boxTitle]: [...prev[boxTitle], droppedItem] };
		});
	};

	return (
		<div>
			<div style={{ minHeight: "200px" }}>
				<h1>Variables</h1>
				<div className={styles.draggablesWrapper}>
					{variables.map(
						(item) =>
							!item.deleted &&
							item.available && (
								<DraggableItem
									name={item.name}
									inverted={item.inverted}
									available={item.available}
								/>
							)
					)}
				</div>
			</div>
			<Box className={styles.boxesContainer}>
				{Object.keys(categoryItems).map((item) => {
					return (
						<DropBox
							title={item}
							accept="item"
							onDrop={(droppedItem) => {
								handleDrop(item, droppedItem);
							}}
							items={categoryItems[item]}
							setCategoryItems={setCategoryItems}
							setAvailableVariables={setVariables}
						/>
					);
				})}
			</Box>
		</div>
	);
};

export default VariablesAssigner;
