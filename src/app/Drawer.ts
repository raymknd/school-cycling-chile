import type { IPlan, IPricesStructure } from '../partials/Plan';

interface IOpenArgs {
  title?: string;
  description?: string;
  prices?: IPricesStructure;
  billingCycles?: {
    price: string;
    id: string;
    cycleType: string;
  }[];
  paymentGateway?: {
    provider: string;
    href?: string;
    price?: string;
  };
  bankTransfer?: {
    href: string;
    price: string;
  };
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

    this.priceSeparator = '';

    this.setDisplayData = this.setDisplayData.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);

    this.closeBtn.onclick = this.handleDrawerClose;
    if (this.backdrop) this.backdrop.onclick = this.handleDrawerClose;
  }

  // private getPriceStructure(p: string, s?: string) {
  //   return ` ${this.priceSeparator} $${p}${s || ''}`;
  // }

  public setDisplayData(d: IOpenArgs) {
    const {
      paymentGateway,
      bankTransfer,
      title,
      description,
      prices,
      billingCycles,
    } = d;

    // Payment gateway
    if (
      paymentGateway &&
      this.paymentGateway &&
      this.paymentGatewayPrice &&
      this.paymentGatewayProvider
    ) {
      this.paymentGatewayProvider.innerHTML = paymentGateway.provider;
      if (paymentGateway.href && paymentGateway.price) {
        this.paymentGateway.ariaDisabled = 'false';
        this.paymentGateway.classList.remove('disabled');
        this.paymentGatewayPrice.innerHTML = paymentGateway.price;
        this.paymentGateway.href = paymentGateway.href;
      }
    }

    // Bank transfer
    if (bankTransfer && this.transferencia && this.transferenciaPrice) {
      this.transferencia.href = bankTransfer.href;
      this.transferenciaPrice.innerHTML = bankTransfer.price;
    }

    // Title
    if (title && this.title) {
      this.title.innerHTML = title;
    }

    // Description
    if (description && this.description) {
      this.description.innerHTML = description;
    }

    // Prices
    if (prices && this.price && this.priceMonthly && this.priceQuarterly) {
      this.priceMonthly.innerHTML = prices.monthly;
      this.priceQuarterly.innerHTML = prices.quarterly;
    }

    // Select
    if (billingCycles && this.select) {
      billingCycles.forEach((b) => {
        const a = this.d.createElement('option');
        a.value = `${b.id}:${b.price}`;
        a.innerHTML = b.cycleType;
        a.dataset.data = JSON.stringify({ price: b.price, id: b.id });
        if (this.select) this.select.appendChild(a);
      });
    }
  }

  public clearAll() {
    this.setDisplayData({
      title: '',
      description: '',
      prices: {
        monthly: '',
        quarterly: '',
      },
      paymentGateway: {
        href: '',
        price: '',
        provider: '',
      },
      bankTransfer: {
        price: '',
        href: '',
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
    this.b.removeAttribute('style');
    this.close(() => {
      if (this.root && this.root.dataset.open === 'false') {
        this.reset();
      }
    });
  }

  public open(data: IPlan, animationEnd?: (e: TransitionEvent) => any) {
    const { title, price, description } = data;

    this.setDisplayData({
      title,
      description,
      prices: {
        monthly: price?.monthly ?? '',
        quarterly: price?.quarterly ?? '',
      },
      paymentGateway: {
        provider: '',
      },
      billingCycles: [
        {
          cycleType: 'Mensual (1 mes)',
          id: 'monthly',
          price: price?.monthly ?? '',
        },
        {
          cycleType: 'Trimestral (3 meses)',
          id: 'quarterly',
          price: price?.quarterly ?? '',
        },
      ],
    });

    if (this.backdrop) this.backdrop.dataset.open = 'true';
    if (this.root) this.root.dataset.open = 'true';
    this.b.style.overflow = 'hidden';
    if (this.root && this.root.dataset.open === 'true' && animationEnd) {
      this.root.ontransitionend = animationEnd;
    }
  }
}
