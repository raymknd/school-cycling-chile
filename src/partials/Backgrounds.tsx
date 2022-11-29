import { BACKGROUNDS } from '@/constants/content';

import styles from '../styles/Backgrounds.module.css';

const Background = (props: { priority: number }) => {
  const { priority } = props;
  return (
    <div className={styles.container}>
      <div className={styles.barrier}></div>
      {BACKGROUNDS.map((e, i) => {
        if (e.type === 'image')
          return (
            <img
              key={e.name}
              draggable="false"
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className={`${e.name} ${styles.media} ${
                priority === i
                  ? styles.isPriority
                  : `${styles.isSecondary} is-secondary`
              } ${e.className || ''}`}
              src={e.src}
            />
          );
        return (
          <video
            key={e.name}
            playsInline
            loop
            muted
            draggable="false"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className={`${e.name} ${styles.media} ${
              priority === i
                ? styles.isPriority
                : `${styles.isSecondary} is-secondary`
            } ${e.className || ''}`}
            src={e.src}
          ></video>
        );
      })}
    </div>
  );
};

export { Background };
