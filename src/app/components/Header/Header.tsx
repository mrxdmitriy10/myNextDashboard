
import styles from './styles.module.scss'
import { TopNav } from './TopNav/TopNav';
interface propsType {
 
}

export const Header:React.FC<propsType> = () => {
    return ( 
<header className={styles.header}>
{/* <iframe allow="clipboard-write" className="h-52" src="https://music.yandex.ru/iframe/track/95129676/19369485"><a href='https://music.yandex.ru/album/19369485/track/95129676'>Autumn Leaves Return</a> — <a href='https://music.yandex.ru/artist/3607166'>The Irresistible Force</a> на Яндекс Музыке</iframe> */}

        <h1 className={styles.tittle}>
        Frontend React JS 
        </h1>
        <TopNav />
      </header>
    );
}