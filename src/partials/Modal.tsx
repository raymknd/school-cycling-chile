import { Fragment } from 'react';

import { Paragraph, Typography } from '@/components/Typography';

import styles from '../styles/Modal.module.sass';
import { LinkButton, OutlinedButton } from './Button';

interface IModalProps {
  id: string;
  title: string;
  content: string;
  buttons: {
    action: string;
    back: string;
    close?: boolean;
  };
}

const Modal = ({ id, title, content, buttons }: IModalProps) => (
  <Fragment>
    <div
      className={styles.backdrop}
      data-open="false"
      data-backdrop={`#${id}`}
    ></div>
    <div className={styles.root} role="dialog" data-open="false" id={id}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Typography variant="h4">{title}</Typography>
          {buttons.close && (
            <a href="#" data-modal="close" className="flex">
              <i className="material-icons">&#xe5cd;</i>
            </a>
          )}
        </div>
        <div className={styles.content}>
          <Paragraph>{content}</Paragraph>
        </div>
        <div className={styles.footer}>
          <div className="flex flex-row gap-1">
            <LinkButton data-modal="close" href="#">
              {buttons.back}
            </LinkButton>
            <OutlinedButton
              href="#"
              data-modal="actionBtn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {buttons.action}
            </OutlinedButton>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Modal;
