import Image from 'next/image';
import React, { useState, useEffect } from 'react';import Header from '../components/header/header';
import ArrowLeftSvg from '../images/arrowleft.svg';
import ArrowRightSvg from '../images/arrowright.svg';
import Download from '../images/download.svg';
import Upload from '../images/upload.svg';
import Logo from '../images/switchLogo.png';

import styles from './settings.module.css'; // Import CSS module
import '../globals.css'; // Import global CSS file


const ColorPicker: React.FC<{title:string ,rgb: string }> = ({ title, rgb }) => {
    return (
        <div className={styles['color-picker']}>
            <h1>{title}</h1>
            <button style={{ backgroundColor: rgb }}/>
        </div>
    );
};



const PageSelector: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className={styles['page-selector-container']}> {/* Apply class for styles */}
            <button>
                <Image src={ArrowLeftSvg} alt="arrow left" /> {/* Use img tag for SVG */}
            </button> {/* Left arrow button */}
            <span>{title}</span> {/* Display the title */}
            <button>
                <Image src={ArrowRightSvg} alt="arrow right" /> {/* Use img tag for SVG */}
            </button> {/* Left arrow button */}
        </div>
    );
};

const ColorSelector: React.FC = () => {

    return (
        <div className={styles['color-selector-container']}> {/* Apply class for styles */}
            <h1>Seleção de cores:</h1> {/* Title on the left side */}
            <ColorPicker title="destaque" rgb="#EC6907"/>
            <ColorPicker title="Fundo Primário" rgb="#F5F5F5"/>
            <ColorPicker title="Fundo Secundário" rgb="#FFFFFF"/>
            <ColorPicker title="Texto Primário" rgb="#56545D"/>
            <ColorPicker title="Texto Secundário" rgb="#9390A6"/>
        </div>
    );
};


const AppearanceButton: React.FC<{ type: string, title: string, icon: string }> = ({ type, title, icon }) => {
    return (
        <button className={styles['basic-button']}>
            {title}
            <Image src={icon} alt={title} style={{ width: '10%', height: '60%', margin: '0 40px' }} /> 
        </button>
    );
};

const AppearanceSettingsManager: React.FC = () => {
    return (
        <div className={styles['appearance-container']}>
            <div className={styles['basic-settings']}>
                <AppearanceButton title="Trocar Logo" type="test" icon={Logo} />
                <AppearanceButton title="Exportar Configuração" type="test" icon={Download} />
                <AppearanceButton title="Importar Configuração" type="test" icon={Upload} />
            </div>
        </div>
    );
};


const Home: React.FC = () => {
    return (
        <>
            <Header type='settings' title='Definições'/>
            <PageSelector title="Aparência"/>
            <ColorSelector/>
            <AppearanceSettingsManager/>
        </>
    );
};

export default Home;
