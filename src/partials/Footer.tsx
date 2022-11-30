/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import { Paragraph, Typography } from '@/components/Typography';
import { PATROCINADORES, RRSS } from '@/constants/content';

import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <React.Fragment>
      <section
        className={`container-max-width mx-auto mt-12 mb-6 flex flex-col gap-10 px-6 text-center`}
      >
        <Typography variant="h3" className="opacity-60">
          Nuestros patrocinadores
        </Typography>
        <ul className="mx-auto flex flex-row flex-wrap justify-center gap-8">
          {PATROCINADORES.map((p) => {
            return (
              <li className={styles.patrocinador} key={p.name}>
                <a
                  className="gap-2"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar ${p.name}`}
                >
                  <img src={p.image} alt={p.name} />
                  <Paragraph className="opacity-60">{p.name}</Paragraph>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
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
        <ul className="my-2 flex flex-row items-center gap-3">
          {RRSS.map((r) => (
            <li key={r.name}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={r.name}
              >
                <i className={`${r.iconClasses} fa-xl`}></i>
              </a>
            </li>
          ))}
        </ul>
        <small className={`${styles.small} italic`}>
          Diseñado y desarrollado con &#60;3 por{' '}
          <a
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://go.pcbkn.cl/school-cycling"
          >
            PcBkn
          </a>
        </small>
        <small className="mt-2 block opacity-50">
          Al usar este sitio web aceptas nuestros{' '}
          <a href="/terminos" className="underline">
            términos y condiciones
          </a>{' '}
          relacionados al uso del mismo.
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
