'use client'
import React from 'react';
import BackArrow from '../../images/svgs/backarrow';
import styles from "./modal.module.css";
import Trash from '@/app/images/svgs/save';


interface BackButtonProps {
    handleSubmit?: () => void;
}

export default function BackButton({ handleSubmit }: BackButtonProps): JSX.Element {
    const modal = document.getElementById('sureModal') as HTMLDialogElement | null;

    const handleArrowClick = () => {
        if (modal) {
            modal.showModal();
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
        window.history.back();
    }

    const handleNotSaveBtn = () => {
        // back
        window.history.back()
    }

    return (
        <>
            <span onClick={handleArrowClick} style={{ cursor: "pointer" }}>
                <BackArrow />
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
