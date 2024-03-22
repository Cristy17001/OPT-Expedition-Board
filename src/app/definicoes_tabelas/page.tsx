"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Header from '../components/header/header';
import ArrowLeftSvg from '../images/arrowleft.svg';
import ArrowRightSvg from '../images/arrowright.svg';
import styles from './settings.module.css';
import Pencil from '../images/Pencil.svg';
import Switch from '../components/switch/switch';
import '../globals.css';
import  useUserPrefs from '../user_prefs';


const PageSelector: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className={styles['page-selector-container']}>
            <button>
                <Image src={ArrowLeftSvg} alt="arrow left" />
            </button>
            <h2>{title}</h2>
            <button>
                <Image src={ArrowRightSvg} alt="arrow right" />
            </button>
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
    const { userPrefs } = useUserPrefs();

    return (
        <>
            <Header type='settings' title='Definições' logo={userPrefs.logo}/>
            <div className={styles.settings_container}>
                <PageSelector title="Tabelas"/>
                <TableContent />
                <button className={styles.save_btn} type="submit">Guardar</button>
            </div>
        </>
    );
};





export default SettingsPage;