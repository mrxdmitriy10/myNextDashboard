import { FunctionComponent } from 'react';
import styles from './styles.module.scss'



type PropsType = {
    children: string;
 
}

export const PurpleButton: FunctionComponent<PropsType> = ({children}) => {


    
    return ( 
            <button className={styles.Purple}>{children}</button>

    );
}

 
