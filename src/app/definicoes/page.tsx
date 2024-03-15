"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';import Header from '../components/header/header';
import ArrowLeftSvg from '../images/arrowleft.svg';
import ArrowRightSvg from '../images/arrowright.svg';
import styles from './settings.module.css';
import '../globals.css';
import  useUserPrefs from '../user_prefs';
import Download from '../images/download.svg';
import Upload from '../images/upload.svg';
import Logo from '../images/switchLogo.png';
import { pages } from 'next/dist/build/templates/app-page';

type ColorPickerProps = {
    title: string;
    rgb: string;
    onColorChange: (newColor: string) => void;
  };

  const ColorPicker: React.FC<ColorPickerProps> = ({ title, rgb, onColorChange }) => {
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onColorChange(event.target.value);
    };

    return (
      <div className={styles['color-picker']}>
        <h1>{title}</h1>
        <input type="color" value={rgb} onChange={handleColorChange} />
      </div>
    );
  };



const PageSelector: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className={styles['page-selector-container']}>
            <button>
                <Image src={ArrowLeftSvg} alt="arrow left" />
            </button>
            <span>{title}</span>
            <button>
                <Image src={ArrowRightSvg} alt="arrow right" />
            </button>
        </div>
    );
};

const ColorSelector: React.FC<{ colors: string[], onColorChange: (colorIndex: number, newColor: string) => void }> = ({ colors, onColorChange }) => {
    return (
        <div className={styles['color-selector-container']}>
            <h1>Seleção de cores:</h1>
            <ColorPicker title="destaque" rgb={colors[2]} onColorChange={(newColor) => onColorChange(2, newColor)} />
            <ColorPicker title="Fundo Primário" rgb={colors[0]} onColorChange={(newColor) => onColorChange(0, newColor)} />
            <ColorPicker title="Fundo Secundário" rgb={colors[1]} onColorChange={(newColor) => onColorChange(1, newColor)} />
            <ColorPicker title="Texto Primário" rgb={colors[3]} onColorChange={(newColor) => onColorChange(3, newColor)} />
            <ColorPicker title="Texto Secundário" rgb={colors[4]} onColorChange={(newColor) => onColorChange(4, newColor)} />
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



const SettingsPage: React.FC = () => {
    const { userPrefs, updateUserPrefs } = useUserPrefs();
    const [colors, setColors] = useState([
        userPrefs.color1,
        userPrefs.color2,
        userPrefs.highlightColor,
        userPrefs.textColor1,
        userPrefs.textColor2,
      ]);

    const handleColorChange = (colorIndex: number, newColor: string) => {
        setColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[colorIndex] = newColor;
            return newColors;
        });
    };


    const rootStyle = {
        '--color-highlight': userPrefs.highlightColor,
        '--color-primary-background': userPrefs.color1,
        '--color-secundary-background': userPrefs.color2,
        '--color-primary-text': userPrefs.textColor1,
        '--color-secundary-text': userPrefs.textColor2,
    };

    const handleSubmit = (event: React.FormEvent) => {
        console.log('Form submitted');
        console.log (colors[2])
        event.preventDefault();
        updateUserPrefs({
            message: userPrefs.message,
            color1: colors[0],
            color2: colors[1],
            highlightColor: colors[2],
            textColor1: colors[3],
            textColor2: colors[4],
            logo: userPrefs.logo,
        });



        window.location.reload();
    };

    useEffect(() => {
        console.log(userPrefs);
      }, [userPrefs]);

    return (
        <form onSubmit={handleSubmit}>
      <Header type='settings' title='Definições' logo={userPrefs.logo} prefstyles={rootStyle as React.CSSProperties}/>
      <PageSelector title="Aparência"/>
      <ColorSelector colors={colors} onColorChange={handleColorChange} />
      <AppearanceSettingsManager/>
      <button type="submit">Guardar</button>
    </form>
    );
};

export default SettingsPage;
