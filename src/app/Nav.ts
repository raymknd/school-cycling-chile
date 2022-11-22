import { SYSTEM_IDS } from '../constants/system';
import { Background } from './Background';

export class Nav {
  d: Document;

  b: HTMLBodyElement;

  root: HTMLElement | null;

  links: NodeListOf<HTMLElement> | null;

  bgHandler: Background;

  toggleButton: HTMLElement | null;

  constructor() {
    this.d = document;
    this.b = this.d.body as HTMLBodyElement;
    this.root = this.d.getElementById(SYSTEM_IDS.NAV);
    this.links = this.root ? this.root.querySelectorAll('ul li a') : null;
    this.bgHandler = new Background();
    this.toggleButton = this.d.getElementById(SYSTEM_IDS.NAV_BUTTON);

    this.initListener();

    this.initToggleListener((e) => {
      e.preventDefault();
      this.toggleMenu();
    });
  }

  private loop(f: (e: HTMLElement) => void) {
    if (this.links) this.links.forEach(f);
  }

  private initListener() {
    this.loop((e) => {
      e.addEventListener('mouseenter', () => {
        if (e.dataset.identificator) {
          this.bgHandler.show(e.dataset.identificator);
        }
      });
      e.addEventListener('mouseleave', () => {
        if (e.dataset.identificator)
          this.bgHandler.hide(e.dataset.identificator);
      });
    });
  }

  private initToggleListener(f: (e: MouseEvent) => void) {
    if (this.toggleButton) this.toggleButton.addEventListener('click', f);
  }

  public toggleMenu() {
    const x = this.b.style.overflow === 'hidden';
    this.b.classList.toggle('menu-open');
    if (!x) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      this.b.style.overflow = 'hidden';
    } else {
      this.b.style.overflow = '';
    }
  }
}
