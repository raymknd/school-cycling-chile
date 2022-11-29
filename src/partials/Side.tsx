/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import { Paragraph, Typography } from '@/components/Typography';

import styles from '../styles/Drawer.module.scss';
import { OutlinedButton } from './Button';

interface IDrawerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  side?: 'left' | 'right';
}

const SideDrawer = (props: IDrawerProps) => {
  const { side, className, ...rest } = props;
  const getSide = () => {
    switch (side) {
      case 'left':
        return styles.left;
      case 'right':
      default:
        return styles.right;
    }
  };
  return (
    <React.Fragment>
      <div
        data-backdrop={`#${props.id}` || 'false'}
        data-open="false"
        className={styles.backdrop}
      ></div>
      <aside
        data-open="false"
        className={`${className || ''} ${styles.drawer} ${getSide()}`}
        {...rest}
      >
        <div className={`${styles.inner} hasFullViewportHeight`}>
          <div className={styles.top}>
            <Typography variant="h4">Comprar</Typography>
            <a
              className="flex"
              data-backdrop="close"
              href="#"
              data-drawer="close"
            >
              <i className="material-icons">&#xe5cd;</i>
            </a>
          </div>
          <div className={`${styles.content}`}>
            <Paragraph className="opacity-50">Estás comprando:</Paragraph>
            <Typography
              variant="h3"
              className="mt-2"
              data-drawer="title"
            ></Typography>
            <Paragraph className="mt-2 opacity-50">Valores:</Paragraph>
            <Typography variant="h4" className="mt-2" data-drawer="price">
              $<span id="quarterly"></span> &times; 3 meses
              <small className="block italic opacity-60">
                $<span id="monthly"></span> &times; 1 mes
              </small>
            </Typography>
            <Paragraph className="mt-2 opacity-50">¿De qué trata?</Paragraph>
            <Paragraph data-drawer="description" className="mb-2" />
          </div>
          <div className={styles.bottom}>
            <div className={styles.select}>
              <select
                data-drawer="select"
                defaultValue="none"
                className={`text-xs sm:text-sm`}
              >
                <option value="none" disabled>
                  Elige una duración...
                </option>
              </select>
              <div className="absolute top-0 right-4 z-0 flex h-full items-center justify-center">
                <i className="material-icons">&#xe5cf;</i>
              </div>
            </div>
            <div className="divider"></div>
            <OutlinedButton
              aria-label="Pagar con transferencia"
              className="!w-full"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              data-drawer="transferencia"
              disabled
            >
              <span>
                Pagar con Transferencia <span id="price"></span>
              </span>
            </OutlinedButton>
            <OutlinedButton
              disabled
              aria-label="Pagar con"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 !w-full"
              href="#"
              data-drawer="paymentGateway"
            >
              <span>
                Pagar con <span id="provider">Mercado Pago</span>&nbsp;
                <span id="price"></span>
              </span>
            </OutlinedButton>
            <small className="mt-4 block opacity-50">
              *La pasarela de pago tiene un cargo extra.
            </small>
            <small className="mt-2 block opacity-50">
              Por el sólo hecho realizar el pago de la mensualidad,
              trimestralidad o anualidad, aceptas nuestros{' '}
              <a href="/terminos" className="underline">
                términos y condiciones de servicio
              </a>
              .
            </small>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
};

export { SideDrawer };
