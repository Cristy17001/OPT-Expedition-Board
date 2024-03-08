import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Logo from '../images/logo.png';
import BackArrow from '../images/backarrow.svg';
import SwitchTable from '../images/switch_table.svg';
import Settings from '../images/settings.svg';
import styles from './header.module.css';


interface Props {
    type: string;
    title: string;
}

const HeaderComponent: React.FC<Props> = ({ type, title }) => {
    return (
        <header className={styles.header}>
            <Image src={Logo} alt="logo" width={100} height={100} />
            <h1 className={styles.title}>{title}</h1>
            <div className='btn-container'>
                {type === "settings" && <Link href="#"><Image src={BackArrow} alt="Go Back" width={50} height={50} /></Link>}
                {(type === "entradas" || type === "saidas") && <Link href="/entradas"><Image src={SwitchTable} alt="Switch Table" width={50} height={50} /></Link>}
                {(type === "entradas" || type === "saidas") && <Link href="/definicoes"><Image src={Settings} alt="Settings" width={50} height={50} /></Link>}
            </div>

        </header>
    );
};

export default HeaderComponent;