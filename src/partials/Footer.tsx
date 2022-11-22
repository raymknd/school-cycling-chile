import React from 'react';

import { Paragraph, Typography } from '@/components/Typography';

import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="relative mx-auto flex w-full flex-col items-start py-8 px-10 opacity-70">
        <img
          src="/static/images/school-cycling-imagotipo-grises.svg"
          className={styles.footerImage}
          alt="School Cycling Logo"
        />
        <Typography variant="h4" className="mt-4">
          School Cycling Chile
        </Typography>
        <Paragraph className="mt-1">
          Empecemos hoy a hacer cosas increíbles.
        </Paragraph>
        <small className={`${styles.small} mt-2 italic`}>
          Diseñado y desarrollado con &#60;3 por{' '}
          <a
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://pcbkn.cl/proyectos/school-cycling?utm_source=schoolcycling&utm_medium=footer"
          >
            PcBkn
          </a>
        </small>
        <a
          id="js--scroll-top"
          className="absolute top-10 right-10 flex w-fit md:bottom-10 md:top-auto"
          href="#"
          aria-label="Volver arriba"
        >
          <i className="material-icons">&#xe5d8;</i>
        </a>
      </footer>
    </React.Fragment>
  );
};

export { Footer };
