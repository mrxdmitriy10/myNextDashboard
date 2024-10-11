
import Login from '../Login/Login';
import styles from './styles.module.scss'
import { TopNav } from './TopNav/TopNav';




export const Header: React.FC = () => {
  // const session = await auth()
  return (

    <header id="auth" className={styles.header}>
      <div className='flex justify-end gap-5 text-md min-h-20'>

        <Login>Вход</Login>
      </div>
      <h1 className={styles.tittle}>
        Frontend React JS
      </h1>
      <TopNav />
    </header>

  );
}