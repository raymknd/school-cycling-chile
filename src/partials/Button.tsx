/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';

import styles from '../styles/Button.module.scss';

interface IButton
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  color?: 'white' | 'black';
  disabled?: boolean;
}

const LinkButton = (props: IButton) => {
  const { color, disabled, ...rest } = props;
  return (
    <a
      {...rest}
      aria-disabled={disabled}
      className={`button ${rest.className || ''} ${
        disabled ? 'disabled' : ''
      } ${styles.linkButton} ${
        color === 'white' ? styles.buttonLight : styles.buttonDark
      } text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm`}
    />
  );
};

const OutlinedButton = (props: IButton) => {
  const { color, disabled, ...rest } = props;
  return (
    <a
      {...rest}
      aria-disabled={disabled}
      className={`button ${rest.className || ''} ${
        disabled ? 'disabled' : ''
      } ${styles.outlinedButton} ${
        color === 'white' ? styles.buttonLight : styles.buttonDark
      } text-xs sm:text-sm`}
    />
  );
};

export { LinkButton, OutlinedButton };
