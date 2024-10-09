
import styles from './styles.module.scss'
import { TopNav } from './TopNav/TopNav';
import LoginLine from './Login/LoginLine';



export const Header:React.FC = () => {
  // const session = await auth()
    return ( 

      <header className={styles.header}>
        <LoginLine />
        <h1 className={styles.tittle}>
        Frontend React JS 
        </h1>
        <TopNav />
      </header>

    );
}