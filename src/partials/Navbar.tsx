import React from 'react';

import { Burger } from '@/components/MenuBurger';
import { RRSS } from '@/constants/content';
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
              <li key={l.identificator}>
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
        <ul className="hidden flex-row items-center gap-3 md:flex">
          {RRSS.map((r) => (
            <li>
              <a
                href={r.href}
                aria-label={r.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={`${r.iconClasses} fa-xl`}></i>
              </a>
            </li>
          ))}
        </ul>
        <Burger />
        {/* <WhatsappIcon /> */}
      </div>
    </header>
  );
};

export { Navbar };
