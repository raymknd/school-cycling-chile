import type { IPlan } from '../partials/Plan';
import { Drawer } from './Drawer';

export class Planes {
  private d: Document;

  // private w: Window;

  // private b: HTMLBodyElement;

  private buttons: NodeListOf<HTMLElement> | null;

  private selector: string;

  private drawer: Drawer;

  constructor() {
    this.d = document;
    // this.w = window;
    // this.b = this.d.body as HTMLBodyElement;
    this.selector = '[data-plan]';
    this.buttons = this.d.querySelectorAll(this.selector);
    this.drawer = new Drawer('#js--payment-drawer');

    this.init = this.init.bind(this);
    this.init();
  }

  private init() {
    // this.drawer.moreInfo.addEventListener('click', (e) => {
    //   e.preventDefault();
    //   this.drawer.handleDrawerClose(e);
    //   document
    //     .getElementsByClassName('js--section-moreInfo')[0]
    //     .scrollIntoView({ behavior: 'smooth' });
    // });
    if (this.buttons) {
      this.buttons.forEach((b) => {
        b.addEventListener('click', (e) => {
          e.preventDefault();
          const d = JSON.parse(b.dataset.plan as string) as IPlan;
          this.drawer.open(d);
        });
      });
    }
  }
}
