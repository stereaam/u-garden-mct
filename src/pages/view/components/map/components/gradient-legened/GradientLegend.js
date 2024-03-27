import React from "react";
import styles from "./GradientLegend.module.scss";
import { useTranslation } from "react-i18next";

const ticks = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const GradientLegend = () => {
	const { t } = useTranslation();
	return (
		<div>
			<strong>{t("totalScore")}</strong>
			<div className={styles.legend}>
				<div className={styles.colors}></div>
				<div className={styles.labelsWrapper}>
					{ticks.map((value) => (
						<div className={styles.label}>{value}</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GradientLegend;
