import React from 'react';

import styles from '../styles/Typography.module.scss';

interface ITypography
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  variant: 'h1' | 'h2' | 'h3' | 'h4';
}

const Paragraph = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) => {
  return (
    <p
      {...props}
      className={`${props.className || ''} ${
        styles.paragraph
      } text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg`}
    />
  );
};

const Typography = (props: ITypography) => {
  const { variant, ...rest } = props;
  switch (variant) {
    case 'h4':
      return (
        <h4
          {...rest}
          className={`${rest.className || ''} ${
            styles.heading
          } text-xl font-medium italic sm:text-2xl md:text-3xl`}
        >
          {rest.children}
        </h4>
      );
    case 'h3':
      return (
        <h3
          {...rest}
          className={`${rest.className || ''} ${
            styles.heading
          } text-2xl font-medium italic sm:text-3xl md:text-4xl`}
        >
          {rest.children}
        </h3>
      );
    case 'h2':
      return (
        <h2
          {...rest}
          className={`${rest.className || ''} ${
            styles.heading
          } text-3xl font-medium italic sm:text-4xl md:text-5xl`}
        >
          {rest.children}
        </h2>
      );
    case 'h1':
    default:
      return (
        <h1
          {...rest}
          className={`${rest.className || ''} ${
            styles.heading
          } text-4xl font-medium italic sm:text-5xl md:text-6xl`}
        >
          {rest.children}
        </h1>
      );
  }
};

export { Paragraph, Typography };
