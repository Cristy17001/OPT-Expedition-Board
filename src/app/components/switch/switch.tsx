import React from 'react';
import styles from './switch.module.css';
import { useState } from 'react';


interface SwitchProps {
    id: string;
}

const Switch: React.FC<SwitchProps> = ({ id }) => {
    const [switchState, setSwitchState] = useState<boolean>(false);

    const handleToggle: React.ChangeEventHandler<HTMLInputElement> = () => {
        setSwitchState(!switchState);
    };

    return (
        <div className={styles.check}>
            <input id={id} type="checkbox" checked={switchState} onChange={handleToggle} />
            <label htmlFor={id}></label>
        </div>
    );
};

export default Switch;