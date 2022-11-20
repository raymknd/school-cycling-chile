import { iOS } from '@/utils/Functions';

export interface ParallaxOptions {
  magnitude?: number | 4;
}

export interface ParallaxData {
  x: number;
  y: number;
}
export class Parallax {
  d: Document;

  b: HTMLBodyElement;

  w: Window;

  root: Element | null;

  options: ParallaxOptions | undefined;

  constructor(selector: string, options?: ParallaxOptions) {
    this.d = document;
    this.b = this.d.body as HTMLBodyElement;
    this.w = window;
    this.root = this.d.querySelector(selector);
    this.options = options;

    this.Init = this.Init.bind(this);
    this.InitScrollListener = this.InitScrollListener.bind(this);
    this.Parallax = this.Parallax.bind(this);

    this.Init();
  }

  private Init(): void {
    if (!this.root) throw new TypeError(`${this.root} no existe.`);
    this.InitScrollListener((_e, d) => {
      // console.log(d);
      this.Parallax(this.root as HTMLElement, d);
    });
  }

  private InitScrollListener(f: (e: Event, d: ParallaxData) => void) {
    this.w.addEventListener('scroll', (e) => {
      const x: ParallaxData = { x: window.scrollX, y: window.scrollY };
      f(e, x);
    });
  }

  private Parallax(el: HTMLElement, s: ParallaxData) {
    const yParallax = (n: number, e: HTMLElement) => {
      e.style.transform = `translateY(${n}px)`;
    };

    const m = this.options?.magnitude || 4;

    const y = s.y / m;
    if (s.y === 0) el.removeAttribute('style');
    if (s.y > 0 && el.offsetHeight >= s.y) {
      if (!iOS()) yParallax(y, el);
    }
  }
}
