"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';import Header from '../components/header/header';
import ArrowLeftSvg from '../images/arrowleft.svg';
import ArrowRightSvg from '../images/arrowright.svg';
import styles from './settings.module.css';
import Pencil from '../images/Pencil.svg';
import '../globals.css';
import  useUserPrefs from '../user_prefs';


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

const TableContent: React.FC = () => {
    return (
        <div className={styles['container']}>
            <ul>
                <li>
                    <span>Carruagem</span>
                    <button type="button">
                        <Image src={Pencil} alt="Edit Button" />
                    </button>
                </li>
                <li>
                    <span>Chapa</span>
                    <button type="button">
                        <Image src={Pencil} alt="Edit Button" />
                    </button>
                </li>
                <li>
                    <span>Altura</span>
                    <button type="button">
                        <Image src={Pencil} alt="Edit Button" />
                    </button>
                </li>
                <li>
                    <span>Mot</span>
                    <button type="button">
                        <Image src={Pencil} alt="Edit Button" />
                    </button>
                </li>
                <li>
                    <span>Hora</span>
                    <button type="button">
                        <Image src={Pencil} alt="Edit Button" />
                    </button>
                </li>
                <li>
                    <span>AC</span>
                    <button type="button">
                        <Image src={Pencil} alt="Edit Button" />
                    </button>
                </li>
                <li>
                    <span>Pressão</span>
                    <button type="button">
                        <Image src={Pencil} alt="Edit Button" />
                    </button>
                </li>
                <li>
                    <span>Observações</span>
                    <button type="button">
                        <Image src={Pencil} alt="Edit Button" />
                    </button>
                </li>
            </ul>
        </div>
    );
};


const SettingsPage: React.FC = () => {
    const { userPrefs } = useUserPrefs();

    return (
        <>
            <Header type='settings' title='Definições' logo={userPrefs.logo} />
            <div className={styles.settings_container}>
                <PageSelector title="Tabelas"/>
                <TableContent />
                <button className={styles.save_btn} type="submit">Guardar</button>
            </div>
        </>
    );
};





export default SettingsPage;