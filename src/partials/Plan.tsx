import { Paragraph, Typography } from '../components/Typography';
import styles from '../styles/Plan.module.scss';
import { OutlinedButton } from './Button';
import type { ISection } from './Section';
import { Section } from './Section';

export interface IPricesProviders {
  bankTransfer: {
    href: string;
    price: string;
  };
  paymentGateway: {
    provider: string;
    href: string;
    price: string;
  };
}

export interface IPricesStructure {
  monthly: IPricesProviders;
  quarterly: IPricesProviders;
  annually: IPricesProviders;
}

export interface IPlanProps extends ISection {
  title: string;
  price: IPricesStructure;
  description: string;
  number: string;
}

export interface IPlan {
  title?: string;
  price?: IPricesStructure;
  number?: string;
  description?: string;
}

const Plan = (props: IPlanProps) => {
  const { title, price, number, description, ...rest } = props;
  return (
    <Section {...rest} id={title.toLowerCase().replaceAll(' ', '_')}>
      <div className="mx-auto w-fit max-w-[1100px] lg:flex lg:w-10/12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className={styles.info}>
          <Typography variant="h2">
            <span className={styles.typographyNumber}>{number} |</span> {title}
          </Typography>
          <Typography variant="h4" className={`${styles.planPrice} mt-4`}>
            ${price.quarterly.bankTransfer.price} &times; 3 meses
            <small className="block italic opacity-60">
              ${price.monthly.bankTransfer.price} &times; 1 mes
            </small>
          </Typography>
        </div>
        <div className="mt-4">
          <Typography variant="h4">¿De qué trata?</Typography>
          <Paragraph className="mt-4">{description}</Paragraph>
          <OutlinedButton
            href="#"
            data-plan={JSON.stringify(props)}
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
