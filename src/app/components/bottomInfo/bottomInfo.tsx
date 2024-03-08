import React from 'react';
import styles from './info.module.css';

export default function BottomInfo() {
    var content: string = "Acidente na A1, trânsito parado. Evite a zona.";
    return (
        <div className={styles.info}>
            <h2 className={styles.title}>Informação</h2>
            <p className={styles.text}>{content}</p>
        </div>
    );
};