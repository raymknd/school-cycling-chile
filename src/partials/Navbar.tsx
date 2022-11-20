import React from 'react';

import { Burger } from '@/components/MenuBurger';
import { NAV_LINKS, SYSTEM_IDS } from '@/constants/system';

import styles from '../styles/Nav.module.scss';

const Navbar = () => {
  return (
    <header className={styles.navRoot} id={SYSTEM_IDS.NAV}>
      <div className={styles.logo}>
        <a href="/">
          <img
            src="/static/images/school-cycling-imagotipo-colores.png"
            alt="Logo"
            draggable="false"
          />
        </a>
      </div>
      <nav className={styles.links}>
        <ul>
          {NAV_LINKS.map((l, i) => {
            return (
              <li>
                <a
                  href={l.href}
                  className="text-xl"
                  style={
                    {
                      '--transitionDelay': `${i / 8}s`,
                    } as React.CSSProperties
                  }
                  data-identificator={l.identificator}
                >
                  {l.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.icon}>
        <Burger />
        {/* <WhatsappIcon /> */}
      </div>
    </header>
  );
};

export { Navbar };
