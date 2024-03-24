'use client'
import React from 'react';
import Image from 'next/image';
import BackArrow from '../../images/svgs/backarrow';

export default function BackButton(): JSX.Element {
    return (
        <>
            <span onClick={() => window.history.back()} style={{ cursor: "pointer" }}>
                <BackArrow />
            </span>
        </>
    );
};
