

import Link from 'next/link';

import styles from './styles.module.scss'
import { PurpleButton } from './Button/PurpleButton';



export const TopNav: React.FC = () => {

   
    return ( 
        <nav className={styles.topnav}>
          
          <Link href='/'><PurpleButton>Я</PurpleButton></Link>
          <Link href='/tasks'><PurpleButton>ЗАДАЧИ</PurpleButton></Link>
          <Link href='/blog'><PurpleButton>БЛОГ</PurpleButton></Link>
          {/* <PurpleButton>ПРОЕКТЫ</PurpleButton> */}
          <Link href='/money'><PurpleButton>ДЕНЬГИ</PurpleButton></Link>
          {/* <PurpleButton>ЛОГИ</PurpleButton>         */}
        </nav>
    );
}