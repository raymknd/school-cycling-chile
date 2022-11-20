interface IClasses {
  fullViewportHeight: string;
}

export class Global {
  d: Document;

  w: Window;

  b: HTMLBodyElement;

  classes: IClasses;

  constructor() {
    this.d = document;
    this.w = window;
    this.b = this.d.body as HTMLBodyElement;
    this.classes = {
      fullViewportHeight: 'hasFullViewportHeight',
    };
  }

  initDisabledService() {
    const b = this.d.querySelectorAll(
      '.button'
    ) as NodeListOf<HTMLAnchorElement>;
    b.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const disabled =
          btn.ariaDisabled === 'true' && btn.classList.contains('disabled');
        if (disabled) e.preventDefault();
      });
    });
  }

  initFullheightService() {
    const classes = this.d.querySelectorAll(
      `.${this.classes.fullViewportHeight}`
    ) as NodeListOf<HTMLDivElement>;
    const setSize = () => {
      const v =
        this.d.documentElement.clientHeight || this.w.innerHeight || false;
      classes.forEach((e) => {
        let h = v;
        if (e.dataset.extra && v) {
          const el = e.dataset.extra;
          const val = Number(el);
          h = v + val;
        }
        e.style.height = h ? `${h}px` : '100vh';
      });
    };
    this.w.addEventListener('DOMContentLoaded', setSize);
    this.w.addEventListener('resize', setSize);
  }
}
