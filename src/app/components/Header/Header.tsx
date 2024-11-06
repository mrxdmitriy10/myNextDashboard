import Login from "@/app/components/Header/Login/Login";
import styles from "./styles.module.scss";
import { TopNav } from "./TopNav/TopNav";

export const Header: React.FC = async () => {
  return (
    <header id="auth" className={styles.header}>


      <h1 className={styles.tittle}>Frontend React JS</h1>
    </header>
  );
};
