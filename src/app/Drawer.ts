import { newWhatsappMessage } from '@/utils/Functions';

import type { IPlan, IPricesStructure } from '../partials/Plan';
import { Modal } from './Modal';

interface IOpenArgs {
  title?: string;
  description?: string;
  prices?: IPricesStructure;
}

type Element = HTMLElement | null;

export class Drawer {
  w: Window;

  d: Document;

  b: HTMLBodyElement;

  root: Element;

  title: Element;

  price: Element;

  priceQuarterly: Element;

  priceMonthly: Element;

  description: Element;

  select: HTMLInputElement | null;

  paymentGateway: HTMLAnchorElement | null;

  paymentGatewayPrice: Element;

  paymentGatewayProvider: Element;

  transferencia: HTMLAnchorElement | null;

  transferenciaPrice: Element;

  moreInfo: HTMLAnchorElement | null;

  closeBtn: Element;

  backdrop: Element;

  priceSeparator: string;

  modal: Modal;

  constructor(rootSelector: string) {
    this.w = window;
    this.d = document;
    this.b = this.d.body as HTMLBodyElement;

    // Main
    this.root = this.d.querySelector(rootSelector);

    // Inner elements

    // Display elements
    this.title = this.d.querySelector(`${rootSelector} [data-drawer="title"]`);
    this.description = this.d.querySelector(
      `${rootSelector} [data-drawer="description"]`
    );

    this.price = this.d.querySelector(
      `${rootSelector} [data-drawer="price"]`
    ) as HTMLElement;
    this.priceQuarterly = this.price.querySelector('#quarterly');
    this.priceMonthly = this.price.querySelector('#monthly');

    // Interactive elements
    this.select = this.d.querySelector(
      `${rootSelector} [data-drawer="select"]`
    );

    this.paymentGateway = this.d.querySelector(
      `${rootSelector} [data-drawer="paymentGateway"]`
    ) as HTMLAnchorElement;
    this.paymentGatewayPrice = this.paymentGateway.querySelector('#price');
    this.paymentGatewayProvider =
      this.paymentGateway.querySelector('#provider');

    this.transferencia = this.d.querySelector(
      `${rootSelector} [data-drawer="transferencia"]`
    ) as HTMLAnchorElement;
    this.transferenciaPrice = this.transferencia.querySelector('#price');

    this.closeBtn = this.d.querySelector(
      `${rootSelector} [data-drawer="close"]`
    ) as HTMLElement;
    this.moreInfo = this.d.querySelector(
      `${rootSelector} [data-drawer="more-info"]`
    );

    // Backdrop
    this.backdrop = this.d.querySelector(`[data-backdrop="${rootSelector}"]`);

    this.priceSeparator = '→';

    this.modal = new Modal('#un-momento_modal');

    this.setDisplayData = this.setDisplayData.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleModal = this.handleModal.bind(this);

    this.closeBtn.onclick = this.handleDrawerClose;
    if (this.backdrop) this.backdrop.onclick = this.handleDrawerClose;

    this.paymentGateway.onclick = this.handleModal;
    this.transferencia.onclick = this.handleModal;
  }

  private handleModal(e: any) {
    e.preventDefault();
    this.modal.actionButton.href = e.currentTarget.href;
    this.modal.open();
  }

  private getPriceStructure(p: string, s?: string) {
    return `${this.priceSeparator} $${p}${s || ''}`;
  }

  public setDisplayData(d: IOpenArgs) {
    const { title, description, prices } = d;

    // Payment gateway
    // if (
    //   price &&
    //   this.paymentGateway &&
    //   this.paymentGatewayPrice &&
    //   this.paymentGatewayProvider
    // ) {
    //   this.paymentGatewayProvider.innerHTML = paymentGateway.provider;
    //   if (paymentGateway.href && paymentGateway.price) {
    //     this.paymentGateway.ariaDisabled = 'false';
    //     this.paymentGateway.classList.remove('disabled');
    //     this.paymentGatewayPrice.innerHTML = paymentGateway.price;
    //     this.paymentGateway.href = paymentGateway.href;
    //   }
    // }

    // Bank transfer
    // if (bankTransfer && this.transferencia && this.transferenciaPrice) {
    //   this.transferencia.href = bankTransfer.href;
    //   this.transferenciaPrice.innerHTML = bankTransfer.price;
    // }

    // Title
    if (title && this.title) {
      this.title.innerHTML = title;
    }

    // Description
    if (description && this.description) {
      this.description.innerHTML = description;
    }

    // Prices
    if (
      prices &&
      this.price &&
      this.priceMonthly &&
      this.priceQuarterly &&
      this.select &&
      this.paymentGateway
    ) {
      this.priceMonthly.innerHTML = prices.monthly.bankTransfer.price;
      this.priceQuarterly.innerHTML = prices.quarterly.bankTransfer.price;

      const a = this.d.createElement('option');
      const b = this.d.createElement('option');
      const c = this.d.createElement('option');

      a.value = JSON.stringify({
        paymentGateway: prices.monthly.paymentGateway,
        bankTransfer: prices.monthly.bankTransfer,
        billingCycle: 'monthly',
      });
      a.innerHTML = 'Mensual (1 mes)';

      b.value = JSON.stringify({
        paymentGateway: prices.quarterly.paymentGateway,
        bankTransfer: prices.quarterly.bankTransfer,
        billingCycle: 'quarterly',
      });
      b.innerHTML = 'Trimestral (3 meses)';

      c.value = JSON.stringify({
        paymentGateway: prices.annually.paymentGateway,
        bankTransfer: prices.annually.bankTransfer,
        billingCycle: 'annually',
      });
      c.innerHTML = 'Anual (1 año)';

      this.paymentGatewayProvider.innerHTML =
        prices.monthly.paymentGateway.provider;
      this.paymentGateway.ariaLabel = `Pagar con ${prices.monthly.paymentGateway.provider}`;

      if (this.select) this.select.appendChild(a);
      if (this.select) this.select.appendChild(b);
      if (this.select) this.select.appendChild(c);
    }
  }

  public clearAll() {
    this.setDisplayData({
      title: '',
      description: '',
      prices: {
        monthly: {
          bankTransfer: {
            href: '',
            price: '',
          },
          paymentGateway: {
            provider: '',
            href: '',
            price: '',
          },
        },
        quarterly: {
          bankTransfer: {
            href: '',
            price: '',
          },
          paymentGateway: {
            provider: '',
            href: '',
            price: '',
          },
        },
        annually: {
          bankTransfer: {
            href: '',
            price: '',
          },
          paymentGateway: {
            provider: '',
            href: '',
            price: '',
          },
        },
      },
    });
  }

  public reset() {
    this.clearAll();
    if (this.select && this.transferencia && this.paymentGateway) {
      this.select.innerHTML = '';
      this.transferencia.ariaDisabled = 'true';
      this.transferencia.classList.add('disabled');
      this.paymentGateway.ariaDisabled = 'true';
      this.paymentGateway.classList.add('disabled');
      const a = this.d.createElement('option');
      a.innerHTML = 'Elige una duración...';
      a.disabled = true;
      a.value = 'none';
      a.selected = true;
      this.select.appendChild(a);
      this.paymentGateway.ariaLabel = 'Pagar con';
      this.paymentGatewayPrice.innerHTML = '';
      this.transferenciaPrice.innerHTML = '';
      this.paymentGateway.href = '#';
      this.transferencia.href = '#';
    }
  }

  public close(animationEnd?: (e: TransitionEvent) => any) {
    if (this.root && this.backdrop) {
      this.backdrop.dataset.open = 'false';
      this.root.dataset.open = 'false';
      if (this.root && this.root.dataset.open === 'false' && animationEnd) {
        this.root.addEventListener('transitionend', animationEnd);
      }
    }
  }

  public handleDrawerClose(e: MouseEvent) {
    e.preventDefault();
    this.b.style.overflow = '';
    this.close(() => {
      if (this.root && this.root.dataset.open === 'false') {
        this.reset();
      }
    });
  }

  public open(data: IPlan, animationEnd?: (e: TransitionEvent) => any) {
    this.setDisplayData({
      title: data.title,
      description: data.description,
      prices: data.price,
    });

    if (this.select && this.paymentGateway) {
      this.select.oninput = () => {
        const r = this.select.value;
        const v = JSON.parse(r);
        this.paymentGateway.ariaDisabled = 'false';
        this.paymentGateway.classList.remove('disabled');
        this.transferencia.ariaDisabled = 'false';
        this.transferencia.classList.remove('disabled');
        this.paymentGatewayPrice.innerHTML = this.getPriceStructure(
          v.paymentGateway.price,
          '*'
        );
        this.paymentGateway.href = v.paymentGateway.href;
        this.transferenciaPrice.innerHTML = this.getPriceStructure(
          v.bankTransfer.price
        );

        const getBillingCycle = () => {
          switch (v.billingCycle) {
            case 'monthly':
              return 'Mensual';
            case 'quarterly':
              return 'Trimestral';
            case 'annually':
            default:
              return 'Anual';
          }
        };

        this.transferencia.href = newWhatsappMessage(
          `Hola! Quiero los datos de transferencia para el plan "${
            data.title
          } - ${getBillingCycle()}"`
        );
      };
    }

    if (this.backdrop) this.backdrop.dataset.open = 'true';
    if (this.root) this.root.dataset.open = 'true';
    this.b.style.overflow = 'hidden';
    if (this.root && this.root.dataset.open === 'true' && animationEnd) {
      this.root.ontransitionend = animationEnd;
    }
  }
}
