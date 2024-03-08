'use client'
import React from 'react';
import Image from 'next/image';
import BackArrow from '../../images/backarrow.svg';

export default function BackButton(): JSX.Element {
    return (
        <>
            <Image src={BackArrow} alt="Go Back" width={55} height={55} onClick={() => window.history.back()} style={{ cursor: "pointer" }}  />
        </>
    );
};
