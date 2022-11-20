import { SYSTEM_IDS } from '@/constants/system';

import styles from '../styles/Burger.module.scss';

const Burger = () => {
  return (
    <a
      className={styles.burgerWrapper}
      aria-label="Menú"
      href="#"
      id={SYSTEM_IDS.NAV_BUTTON}
    >
      <div className={styles.hamburger}></div>
      <div className={styles.contentFill}></div>
    </a>
  );
};

export { Burger };
