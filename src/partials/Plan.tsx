import { Paragraph, Typography } from '../components/Typography';
import styles from '../styles/Plan.module.scss';
import { OutlinedButton } from './Button';
import type { ISection } from './Section';
import { Section } from './Section';

export interface IPricesStructure {
  monthly: string;
  quarterly: string;
}

export interface IPlanProps extends ISection {
  title: string;
  price: IPricesStructure;
  description: string;
  number: string;
  paymentGateway: {
    provider: string;
    href: IPricesStructure;
  };
}

export interface IPlan {
  title?: string;
  price?: IPricesStructure;
  number?: string;
  description?: string;
  paymentGateway?: IPlanProps['paymentGateway'];
}

const Plan = (props: IPlanProps) => {
  const { title, price, number, description, paymentGateway, ...rest } = props;
  return (
    <Section {...rest} id={title.toLowerCase().replaceAll(' ', '_')}>
      <div className="mx-auto w-fit max-w-[1100px] lg:flex lg:w-10/12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className={styles.info}>
          <Typography variant="h2">
            <span className={styles.typographyNumber}>{number} |</span> {title}
          </Typography>
          <Typography variant="h4" className={`${styles.planPrice} mt-4`}>
            ${price.quarterly} &times; 3 meses
            <small className="block italic opacity-60">
              ${price.monthly} &times; 1 mes
            </small>
          </Typography>
        </div>
        <div className="mt-4">
          <Typography variant="h4">¿De qué trata?</Typography>
          <Paragraph className="mt-4">{description}</Paragraph>
          <OutlinedButton
            href="#"
            data-plan={JSON.stringify({
              title,
              price,
              description,
              number,
              paymentGateway,
            })}
            className="mt-6"
          >
            Quiero este
          </OutlinedButton>
        </div>
      </div>
    </Section>
  );
};

export { Plan };
