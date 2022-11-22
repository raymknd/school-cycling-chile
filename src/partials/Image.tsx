import React from 'react';

import styles from '../styles/Image.module.scss';

interface IProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

const BorderImage = (props: IProps) => {
  const { children, ...rest } = props;
  return (
    <div className={`${props.className || ''} ${styles.root}`}>
      <div className={styles.leftCorner} />
      <div className={styles.rightCorner} />
      {children && <div className={styles.content}>{children}</div>}
      <img
        {...rest}
        draggable="false"
        className={`${styles.image} ${children ? styles.hasContent : ''}`}
      />
    </div>
  );
};

export { BorderImage };
