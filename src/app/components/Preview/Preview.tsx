import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Preview.module.css'
import { UserPrefs } from '@/app/user_prefs';
import SwitchTable from '../../images/svgs/switch_table'
import Settings from '../../images/svgs/settings';

type Props = {
    type: string;
    title: string;
    userPrefs: UserPrefs;
};

export default function PreviewComponent({ type, title, userPrefs }: Props) {
    const logo = userPrefs.logo;
    return (<>
        <div className={styles.header}>
            <Link href="">
                <Image src={logo} alt="logo" width={100} height={100} />
            </Link>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.btn_container}>
                <Link href="">
                    <SwitchTable />
                </Link>
                <Link href="">
                    <Settings />
                </Link>
            </div>
        </div>
        <div className={styles.table_container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>DutyStartTime</th>
                        <th>DutyEndTimeSeconds</th>
                        <th>IsDriverPresent</th>
                        <th>VehicleNr</th>

                    </tr>
                </thead>
                <tbody>
                    {Array(4).fill(null).map((_, index) => (
                        <tr key={index}>
                            <td>00:00</td>
                            <td>00:00</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.info}>
            <h2 className={styles.title}>Informação</h2>
            <p className={styles.text}>Prévia</p>
        </div>
    </>
    );
}
