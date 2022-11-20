import type { ReactNode } from 'react';

import styles from '../styles/Container.module.scss';

const ArticleContainer = (props: {
  children: ReactNode;
  noMargin?: boolean;
}) => {
  return (
    <article
      className={`${styles.article} ${
        props.noMargin ? '' : 'mx-auto'
      } px-9 py-12`}
    >
      {props.children}
    </article>
  );
};

export { ArticleContainer };
