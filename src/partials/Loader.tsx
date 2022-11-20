import styles from '../styles/Loader.module.scss';

const Loader = () => {
  const e = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  return (
    <div className={`${styles.loaderGrid} loader-grid`}>
      {e.map((x) => {
        return (
          <div
            className={`${styles.loaderItem} ${styles[`div${x + 1}`]}`}
            style={{
              background: `rgba(0,0,0,${getRandomArbitrary(0.1, 0.3)})`,
            }}
          />
        );
      })}
    </div>
  );
};

export { Loader };
