/* eslint-disable tailwindcss/no-custom-classname */
import { Paragraph, Typography } from '@/components/Typography';

import styles from '../styles/Hero.module.scss';
import { Background } from './Backgrounds';
import { OutlinedButton } from './Button';

const Hero = (props: {
  title: string;
  priority: number;
  subtitle?: string;
  buttonText?: string;
  height?: 'half' | 'full' | undefined;
}) => {
  const { title, priority, subtitle, buttonText, height } = props;
  return (
    <div
      className={`${styles.root} ${
        height === 'half' ? 'h-[50vh!important]' : 'hasFullViewportHeight'
      }`}
      data-extra={height === 'half' ? undefined : '75'}
    >
      <Background priority={priority} />
      <div
        className={`${styles.content} ${
          height === 'half' ? 'h-full' : styles.isFullHeight
        }`}
      >
        <div className="container flex flex-col gap-5 px-5 text-center">
          <Typography variant="h1" className="mx-auto md:w-10/12">
            {title}
          </Typography>
          {subtitle && (
            <Paragraph className="mx-auto w-11/12">{subtitle}</Paragraph>
          )}
          {buttonText && (
            <OutlinedButton
              color="white"
              href="#main-content"
              className="mx-auto mt-2"
              id="js--hero-button"
            >
              {buttonText}
            </OutlinedButton>
          )}
        </div>
      </div>
      <div className={styles.outTriangles} />
    </div>
  );
};

export { Hero };
