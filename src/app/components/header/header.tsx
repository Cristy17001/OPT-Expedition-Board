import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import BackButton from './backbutton';
import SwitchTable from '../../images/switch_table.svg'
import Settings from '../../images/settings.svg';
import useUserPrefs from '@/app/user_prefs';

type Props = {
    type: string;
    title: string;
    logo: string;
    prefstyles: React.CSSProperties;
};

export default function HeaderComponent({ type, title, logo, prefstyles }: Props) {
    const { userPrefs } = useUserPrefs();


    return (
        <header className={styles.header} style={prefstyles}>
            <Link href="/">
                <Image src={logo} alt="logo" width={100} height={100} />
            </Link>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.btn_container}>
                {type === 'settings' && <BackButton />}
                {(type === 'entradas' && (
                    <Link href="/saidas">
                        <Image src={SwitchTable} alt="Switch Table" width={50} height={50} />
                    </Link>
                )) ||
                    (type === 'saidas' && (
                        <Link href="/entradas">
                            <Image src={SwitchTable} alt="Switch Table" width={50} height={50} />
                        </Link>
                    ))}
                {(type === 'entradas' || type === 'saidas') && (
                    <Link href="/definicoes">
                        <Image src={Settings} alt="Settings" width={50} height={50} />
                    </Link>
                )}
            </div>
        </header>
    );
}

