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
import Logo from '../images/switchLogo.svg';
import Switch from '../components/switch/switch';
import Pencil from '../images/Pencil.svg';

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
      <div className={styles.color_picker}>
        <p>{title}</p>
        <div style={{ backgroundColor: rgb }}>
            <input type="color" onChange={handleColorChange} />
        </div>
      </div>
    );
  };



const PageSelector: React.FC<{ title: string , buttonFunc: () => void }> = ({ title, buttonFunc }) => {
    return (
        <div className={styles['page-selector-container']}>
            <button onClick={buttonFunc}>
                <Image src={ArrowLeftSvg} alt="arrow left" />
            </button>
            <h2>{title}</h2>
            <button onClick={buttonFunc}>
                <Image src={ArrowRightSvg} alt="arrow right" />
            </button>
        </div>
    );
};

const ColorSelector: React.FC<{ colors: string[], onColorChange: (colorIndex: number, newColor: string) => void }> = ({ colors, onColorChange }) => {
    return (
        <div className={styles.color_selector_container}>
            <h2>Seleção de cores:</h2>
            <ColorPicker title="Destaque" rgb={colors[2]} onColorChange={(newColor) => onColorChange(2, newColor)} />
            <ColorPicker title="Fundo Primário" rgb={colors[0]} onColorChange={(newColor) => onColorChange(0, newColor)} />
            <ColorPicker title="Fundo Secundário" rgb={colors[1]} onColorChange={(newColor) => onColorChange(1, newColor)} />
            <ColorPicker title="Texto Primário" rgb={colors[3]} onColorChange={(newColor) => onColorChange(3, newColor)} />
            <ColorPicker title="Texto Secundário" rgb={colors[4]} onColorChange={(newColor) => onColorChange(4, newColor)} />
        </div>
    );
};


const AppearanceButton: React.FC<{ type: string, title: string, icon: string, func: (newLogo: string) => void }> = ({ title, icon, func }) => {
    const handleClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Accept only image files
        input.onchange = () => {
          const file = input.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.result) {
                func(reader.result.toString());
              }
            };
            reader.onerror = () => {
              console.error('Error reading file:', reader.error);
            };
            reader.readAsDataURL(file); // Read the file as a Data URL
          }
        };
        input.click();
      };


    return (
        <button className={styles['basic-button']} onClick={handleClick}>

            <div>
                <h2>{title}</h2>
                <Image src={icon} alt={title} style={{ maxWidth: '50px', maxHeight: '60px', aspectRatio: '1/1' }} />
            </div>
        </button>
    );
};


const ExportConfigButton: React.FC<{ type: string, title: string, icon: string, func: () => void }> = ({ title, icon, func }) => {

    return (
        <button className={styles['basic-button']} onClick={func}>

            <div>
                <h2>{title}</h2>
                <Image src={icon} alt={title} style={{ maxWidth: '50px', maxHeight: '60px', aspectRatio: '1/1' }} />
            </div>
        </button>
    );
};

const ImportConfigButton: React.FC<{ type: string, title: string, icon: string, func: () => void }> = ({ title, icon, func }) => {

    return (
        <button className={styles['basic-button']} onClick={func}>

            <div>
                <h2>{title}</h2>
                <Image src={icon} alt={title} style={{ maxWidth: '50px', maxHeight: '60px', aspectRatio: '1/1' }} />
            </div>
        </button>
    );
};

const AppearanceSettingsManager: React.FC<{ setLogo: (newLogo: string) => void, exportConfig: () => void, importConfig: () => void }> = ({ setLogo, exportConfig, importConfig }) => {
    return (
        <div className={styles['appearance-container']}>
            <div className={styles['basic-settings']}>
                <AppearanceButton title="Trocar Logo" type="test" icon={Logo} func={setLogo}/>
                <ExportConfigButton title="Exportar Configuração" type="test" icon={Download} func={exportConfig}/>
                <ImportConfigButton title="Importar Configuração" type="test" icon={Upload} func={importConfig}/>
            </div>
        </div>
    );
};

const TableContent: React.FC = () => {
    return (
        <div className={styles['table-content-container']}>
            <div>
                <div>
                    <p>Carruagem</p>
                    <div className={styles.action_container}>
                        <Switch id={"1"} />
                        <button type="button">
                            <Image src={Pencil} alt="Edit Button" />
                        </button>
                    </div>
                </div>
                <div>
                    <p>Chapa</p>
                    <div className={styles.action_container}>
                        <Switch id={"2"}/>
                        <button type="button">
                            <Image src={Pencil} alt="Edit Button" />
                        </button>
                    </div>
                </div>
                <div>
                    <p>Altura</p>
                    <div className={styles.action_container}>
                        <Switch id={"3"}/>
                        <button type="button">
                            <Image src={Pencil} alt="Edit Button" />
                        </button>
                    </div>
                </div>
                <div>
                    <p>Mot</p>
                    <div className={styles.action_container}>
                        <Switch id={"4"}/>
                        <button type="button">
                            <Image src={Pencil} alt="Edit Button" />
                        </button>
                    </div>
                </div>
                <div>
                    <p>Hora</p>
                    <div className={styles.action_container}>
                        <Switch id={"5"}/>
                        <button type="button">
                            <Image src={Pencil} alt="Edit Button" />
                        </button>
                    </div>
                </div>
                <div>
                    <p>AC</p>
                    <div className={styles.action_container}>
                        <Switch id={"6"}/>
                        <button type="button">
                            <Image src={Pencil} alt="Edit Button" />
                        </button>
                    </div>
                </div>
                <div>
                    <p>Pressão</p>
                    <div className={styles.action_container}>
                        <Switch id={"7"}/>
                        <button type="button">
                            <Image src={Pencil} alt="Edit Button" />
                        </button>
                    </div>
                </div>
                <div>
                    <p>Observações</p>
                    <div className={styles.action_container}>
                        <Switch id={"8"}/>
                        <button type="button">
                            <Image src={Pencil} alt="Edit Button" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const SettingsPage: React.FC = () => {
    const [settingsState, setSettingsState ] = useState<string>('appearance');
    const { userPrefs, updateUserPrefs } = useUserPrefs();
    const [colors, setColors] = useState([
        userPrefs.color1,
        userPrefs.color2,
        userPrefs.highlightColor,
        userPrefs.textColor1,
        userPrefs.textColor2,
      ]);

    const [logo, setLogo] = useState(userPrefs.logo);

    const handleColorChange = (colorIndex: number, newColor: string) => {
        setColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[colorIndex] = newColor;
            return newColors;
        });
    };

    const handleLogoChange = (newLogo: string) => {
        setLogo(() => {
            return newLogo;
        });
    }

    const handleExportConfig = () => {
        const data = {
            color1: colors[0],
            color2: colors[1],
            highlightColor: colors[2],
            textColor1: colors[3],
            textColor2: colors[4],
            logo: logo,
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], {type: 'application/json'});
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'config.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      const handleImportConfig = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json'; // Accept only JSON files
        input.onchange = () => {
          const file = input.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.result) {
                const data = JSON.parse(reader.result.toString());
                setColors([
                    data.color1,
                    data.color2,
                    data.highlightColor,
                    data.textColor1,
                    data.textColor2,
                ]);
                setLogo(data.logo);
              }
            };
            reader.onerror = () => {
              console.error('Error reading file:', reader.error);
            };
            reader.readAsText(file); // Read the file as text
          }
        };
        input.click();
      }


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
            logo: logo,
        });
    };

    const pageSwitch = () => {
        if (settingsState == 'appearance') {
            setSettingsState('tables');
        } else {
            setSettingsState('appearance');
        }
    };

    return (
        <>
            <Header type='settings' title='Definições' logo={userPrefs.logo} prefstyles={rootStyle as React.CSSProperties}/>
            <form className={styles.settings_container} onSubmit={handleSubmit}>
                {settingsState == 'appearance' ? (
                    <>
                        <PageSelector title="Aparência" buttonFunc={pageSwitch}/>
                        <ColorSelector colors={colors} onColorChange={handleColorChange} />
                        <AppearanceSettingsManager setLogo={handleLogoChange} exportConfig={handleExportConfig} importConfig={handleImportConfig}/>
                    </>
                ) : (
                    <>
                        <PageSelector title="Tabelas" buttonFunc={pageSwitch}/>
                        <TableContent />
                    </>
                )}
                <button className={styles.save_btn} type="submit">Guardar</button>
            </form>
        </>
    );
};

export default SettingsPage;
