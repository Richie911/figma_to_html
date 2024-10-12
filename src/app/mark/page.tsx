// components/MarkerNavigation.js
import React from 'react';
import styles from './MarkerNavigation.module.css';

const MarkerNavigation = () => {
	return (
		<div className={styles.container}>
			{/* Gradient Background Block */}
			<div className={styles.gradientBlock}>
				<span className={styles.number}>00</span>
			</div>

			{/* Dark Block with "DRIVERS" */}
			<div className={styles.darkBlock}>
				<span className={styles.label}>DRIVERS</span>
			</div>
		</div>
	);
};

export default MarkerNavigation;
