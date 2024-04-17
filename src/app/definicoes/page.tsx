"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';import Header from '../components/header/header';
import ArrowLeft from '../images/svgs/arrowleft';
import ArrowRight from '../images/svgs/arrowright';
import styles from './settings.module.css';
import '../globals.css';
import  useUserPrefs, { UserPrefs } from '../user_prefs';
import Download from '../images/svgs/download';
import Upload from '../images/svgs/upload';
import SwitchLogo from '../images/svgs/switchLogo';
import Switch from '../components/switch/switch';
import Pencil from '../images/svgs/pencil';
import CheckMark from '../images/svgs/checkMark';
import ArrowUp from '../images/svgs/arrowUp';
import ArrowDown from '../images/svgs/arrowDown';
import PreviewComponent from '../components/Preview/Preview';

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
                <ArrowLeft />
            </button>
            <h2>{title}</h2>
            <button onClick={buttonFunc}>
                <ArrowRight />
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


const AppearanceButton: React.FC<{ title: string, func: (newLogo: string) => void }> = ({ title, func }) => {
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
                <SwitchLogo />
            </div>
        </button>
    );
};


const ExportConfigButton: React.FC<{ title: string, func: () => void }> = ({ title, func }) => {

    return (
        <button className={styles['basic-button']} onClick={func}>

            <div>
                <h2>{title}</h2>
                <Upload />
            </div>
        </button>
    );
};

const ImportConfigButton: React.FC<{ title: string, func: () => void }> = ({ title, func }) => {

    return (
        <button className={styles['basic-button']} onClick={func}>

            <div>
                <h2>{title}</h2>
                <Download />
            </div>
        </button>
    );
};

const AppearanceSettingsManager: React.FC<{colors: string[],  userPrefs: UserPrefs, setLogo: (newLogo: string) => void, exportConfig: () => void, importConfig: () => void }> = ({ colors, userPrefs, setLogo, exportConfig, importConfig }) => {
    const rootStyle = {
        '--color-highlight': colors[2],
        '--color-primary-background': colors[0],
        '--color-secundary-background': colors[1],
        '--color-primary-text': colors[3],
        '--color-secundary-text': colors[4],
    };

    return (
        <div className={styles['appearance-container']}>
            <div className={styles['basic-settings']}>
                <AppearanceButton title="Trocar Logo" func={setLogo}/>
                <ExportConfigButton title="Exportar Configuração" func={exportConfig}/>
                <ImportConfigButton title="Importar Configuração" func={importConfig}/>
            </div>
            <div className={styles['preview-container']} style={rootStyle as React.CSSProperties}>
                <PreviewComponent type='' title='Quadro De Entradas' userPrefs={userPrefs}/>
            </div>
        </div>
    );
};

const InfoBox: React.FC < ( {oldMessage: string, updateMessage: (updateMessage: string) => void })> = ({oldMessage, updateMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState("");
    const [originalText, setOriginalText] = useState(oldMessage);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedText(oldMessage);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(e.target.value);
    };

    const handleSaveClick = () => {
        updateMessage(editedText);
        setOriginalText(editedText || originalText);
        setIsEditing(false);
    };

    return (
        <div className={styles['info-box-container']}>
            <div>
                <p>Informação: </p>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={handleInputChange}
                        placeholder="Escreva aqui"
                    />
                ) : (
                    <>
                        <p>{originalText}</p>
                        <button onClick={handleEditClick}><Pencil/></button>
                    </>
                )}
                {isEditing && (
                    <button onClick={() => handleSaveClick()}><CheckMark/></button>
                )}
            </div>
        </div>
    );
};




const TableContent: React.FC < ( {updateColumnNamesAndOrder: (newNames: Array<[string, string]>, newOrder: string[]) => void })> = ({updateColumnNamesAndOrder}) => {

    let initialElementsState: { isEditing: boolean, editedText: string ,order: string }[] = [];
    const { userPrefs, updateUserPrefs } = useUserPrefs();

    userPrefs.column_order.forEach(element => {
        userPrefs.table_map.forEach(column_name => {
            if (element == column_name[0]) {
                initialElementsState.push({ isEditing: false, editedText: column_name[1], order: column_name[0]});
            }
        });
    });


    let [elementsState, setElementsState] = useState(initialElementsState);



    const handleEditClick = (index: number) => {
        const newElementsState = [...elementsState];
        newElementsState[index].isEditing = true;
        setElementsState(newElementsState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newElementsState = [...elementsState];
        newElementsState[index].editedText = e.target.value;
        setElementsState(newElementsState);
    };

    const handleInputSave = (index: number) => {
        const newElementsState = [...elementsState];
        newElementsState[index].isEditing = false;

        console.log("Saved!");

        setElementsState(newElementsState);

        let newNames: Array<[string, string]> = [];
        for (let i = 0; i < newElementsState.length; i++) {
            userPrefs.table_map.forEach(column_name => {
                if (userPrefs.column_order[i] == column_name[0]) {
                    newNames.push([column_name[0], newElementsState[i].editedText]);
                }
            });
        }

        

        updateColumnNamesAndOrder(newNames, userPrefs.column_order);
    };

    const changeColumnOrder = (index: number, isUp: boolean) => {


        if ((index === 0 && isUp) || (index === userPrefs.column_order.length - 1 && !isUp)) {
            return;
        }
    
        const newElementState = [...elementsState];
    
        const tempElement = newElementState[index];
        newElementState[index] = newElementState[isUp ? index - 1 : index + 1];
        newElementState[isUp ? index - 1 : index + 1] = tempElement;

    
        setElementsState(newElementState);

        let newOrder: string[] = [];
        for (let i = 0; i < newElementState.length; i++) {
            newOrder.push(newElementState[i].order);
        }


        updateColumnNamesAndOrder(userPrefs.table_map, newOrder);
    };

    return (
        <div className={styles['table-content-container']}>
        <div>
            {elementsState.map((element, index) => (
                <div key={index}>
                    <div className={styles['orderButton']}>
                        <button onClick={() => changeColumnOrder(index,true)}><ArrowUp/></button>
                        <button onClick={() => changeColumnOrder(index,false)}><ArrowDown/></button>
                    </div>
                    {element.isEditing ? (
                        <input
                            type="text"
                            value={element.editedText}
                            onChange={(e) => handleInputChange(e, index)}
                            className={styles.input_field}
                        />
                    ) : (
                        <p>{element.editedText}</p>
                    )}
                    <div className={styles.action_container}>
                        <Switch id={String(index + 1)} />
                        <button type="button" onClick={() => element.isEditing ? handleInputSave(index) : handleEditClick(index)}>
                            {element.isEditing ? <CheckMark /> : <Pencil />}
                        </button>
                    </div>
                </div>
            ))}
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
            table_map: userPrefs.table_map,
            column_order: userPrefs.column_order
        });
    };

    const handleNewMessage = (newMessage: string) => {
        updateUserPrefs({
            message: newMessage,
            color1: colors[0],
            color2: colors[1],
            highlightColor: colors[2],
            textColor1: colors[3],
            textColor2: colors[4],
            logo: logo,
            table_map: userPrefs.table_map,
            column_order: userPrefs.column_order
        });
    }

    const handleColumnNamesChangeAndOrder = (newNames: Array<[string, string]>, newOrder: string[]) => {
        updateUserPrefs({
            message: userPrefs.message,
            color1: userPrefs.color1,
            color2: userPrefs.color2,
            highlightColor: userPrefs.highlightColor,
            textColor1: userPrefs.textColor1,
            textColor2: userPrefs.textColor2,
            logo: logo,
            table_map: newNames,
            column_order: newOrder
        });
    }

    const pageSwitch = () => {
        if (settingsState == 'appearance') {
            setSettingsState('tables');
        } else {
            setSettingsState('appearance');
        }
    };

    return (
        <main style={rootStyle as React.CSSProperties}>
            <Header type='settings' title='Definições' logo={userPrefs.logo} prefstyles={rootStyle as React.CSSProperties}/>
            <form className={styles.settings_container} onSubmit={handleSubmit} style={rootStyle as React.CSSProperties}>
                {settingsState == 'appearance' ? (
                    <>
                        <PageSelector title="Aparência" buttonFunc={pageSwitch}/>
                        <ColorSelector colors={colors} onColorChange={handleColorChange} />
                        <AppearanceSettingsManager setLogo={handleLogoChange} exportConfig={handleExportConfig} importConfig={handleImportConfig} colors={colors} userPrefs={userPrefs}/>
                    </>
                ) : (
                    <>
                        <PageSelector title="Tabelas" buttonFunc={pageSwitch}/>
                        <TableContent updateColumnNamesAndOrder={handleColumnNamesChangeAndOrder}/>
                        <InfoBox updateMessage={handleNewMessage} oldMessage={userPrefs.message}/>
                    </>
                )}
                <button className={styles.save_btn} type="submit">Guardar</button>
            </form>
        </main>
    );
};

export default SettingsPage;
