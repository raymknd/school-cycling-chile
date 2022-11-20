import React from 'react';

import styles from '../styles/Section.module.scss';

export interface ISection
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  hasIn?: boolean;
  hasOut?: boolean;
  bgColor?: string;
  image?: {
    src: string;
    className?: string;
    alt?: string;
    onLargeGoesFirst?: boolean;
  };
}

const InTriangles = (props: { color: string }) => {
  return (
    <div
      className={styles.inTriangles}
      style={{
        background: props.color,
        borderBottom: `1px solid ${props.color}`,
      }}
    />
  );
};
const OutTriangles = (props: { color: string }) => {
  return (
    <div
      className={styles.outTriangles}
      style={{
        background: props.color,
        borderBottom: `1px solid ${props.color}`,
      }}
    />
  );
};

const Section = (props: ISection) => {
  const { bgColor, hasIn, hasOut, image, ...rest } = props;
  return (
    <section className={styles.sectionRoot} {...rest}>
      {hasIn && <InTriangles color={bgColor || ''} />}
      <div
        className="py-8 px-9 md:py-12 lg:flex lg:items-center"
        style={{ background: bgColor || '' }}
      >
        <div
          className={`container mx-auto ${image?.src ? 'lg:w-6/12' : ''} ${
            image?.onLargeGoesFirst ? 'order-2' : 'order-1'
          }`}
        >
          {rest.children}
        </div>
        {image && (
          <img
            src={image.src}
            alt={image.alt || image.src}
            className={`${image.className || ''} ${
              image.onLargeGoesFirst ? 'order-1' : 'order-2'
            } mx-auto mt-12 w-full max-w-[500px] grayscale lg:mt-0`}
          />
        )}
      </div>
      {hasOut && <OutTriangles color={bgColor || ''} />}
    </section>
  );
};

export { Section };
