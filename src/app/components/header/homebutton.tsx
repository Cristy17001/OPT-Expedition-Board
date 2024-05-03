'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from "./modal.module.css";
import Trash from '@/app/images/svgs/save';


interface HomeButtonProps {
    logo: string;
    handleSubmit?: () => void;
    handleChange?: () => boolean;
}

export default function HomeButton({ logo, handleSubmit, handleChange }: HomeButtonProps): JSX.Element {
    const modal = document.getElementById('sureModal') as HTMLDialogElement | null;

    const handleArrowClick = () => {
        if (modal && handleChange && handleChange()) {
            modal.showModal();
        }
        else {
            window.history.back();
        }
    };

    const handleModalClick = (e: any) => {
        if (!modal) return
        const dialogDimensions = modal.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    }

    const handleSaveBtn = () => {
        // save
        if (handleSubmit) {
            handleSubmit();
        }
        window.location.href = '/'
    }

    const handleNotSaveBtn = () => {
        // back
        window.location.href = '/'
    }

    return (
        <>
            <span onClick={handleArrowClick} style={{ cursor: "pointer" }}>
                <Image src={logo} alt="logo" width={100} height={100} />
            </span>
            <dialog id='sureModal' className={styles.modal} onClick={(e) => handleModalClick(e)}>
                <div className={styles.container}>
                    <div className={styles.textContainer}>
                        <Trash />
                        <h2>Guardar?</h2>
                        <p>Não guardas-te as novas definições! Queres guardar?</p>
                    </div>
                    <div className={styles.btn_container}>
                        <button className={styles.save_btn} type='button' onClick={handleSaveBtn}>Guardar</button>
                        <button className={styles.back_btn} type='button' onClick={handleNotSaveBtn}>Não Guardar</button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
