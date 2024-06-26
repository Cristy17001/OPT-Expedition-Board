import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import HomeButton from './homebutton';
import BackButton from './backbutton';
import SwitchTable from '../../images/svgs/switch_table';
import Settings from '../../images/svgs/settings';
import Home from '@/app/page';

type Props = {
    type: string;
    title: string;
    logo: string;
    prefstyles: React.CSSProperties;
    handleSubmit?: () => void;
    handleChange?: () => boolean;
};

export default function HeaderComponent({ type, title, logo, prefstyles, handleSubmit, handleChange}: Props) {

    return (
        <header className={styles.header} style={prefstyles}>
            <HomeButton logo={logo} handleSubmit={handleSubmit} handleChange={handleChange} />
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.btn_container}>
                {type === 'settings' && <BackButton handleSubmit={handleSubmit} handleChange={handleChange} />}
                {(type === 'entradas' && (
                    <Link href="/saidas">
                        <SwitchTable />
                    </Link>
                )) ||
                    (type === 'saidas' && (
                        <Link href="/entradas">
                            <SwitchTable />
                        </Link>
                    ))}
                {(type === 'entradas' || type === 'saidas') && (
                    <Link href="/definicoes">
                        <Settings />
                    </Link>
                )}
            </div>
        </header>
    );
}

