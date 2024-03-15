import React from 'react';
import styles from './info.module.css';
import useUserPrefs from '../../user_prefs';

export default function BottomInfo() {
    const {userPrefs} = useUserPrefs();
    const content: string = userPrefs.message;
    return (
        <div className={styles.info}>
            <h2 className={styles.title}>Informação</h2>
            <p className={styles.text}>{content}</p>
        </div>
    );
};
