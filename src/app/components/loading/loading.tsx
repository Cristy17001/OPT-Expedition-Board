import React from 'react';
import styles from './loading.module.css';

export default function LoadingComponent(): JSX.Element {
    return (
        <div className={styles.loading_container}>
            <div className={styles.hourglassBackground}>
                <div className={styles.hourglassContainer}>
                    <div className={styles.hourglassCurves}></div>
                    <div className={styles.hourglassCapTop}></div>
                    <div className={styles.hourglassGlassTop}></div>
                    <div className={styles.hourglassSand}></div>
                    <div className={styles.hourglassSandStream}></div>
                    <div className={styles.hourglassCapBottom}></div>
                    <div className={styles.hourglassGlass}></div>
                </div>
            </div>
        </div>
    );
};

