import type { IBackgrounds } from '@/constants/content';
import { BACKGROUNDS } from '@/constants/content';

export class Background {
  private d: Document;

  // private b: HTMLBodyElement;

  private backgrounds: IBackgrounds[];

  constructor() {
    this.d = document;
    // this.b = this.d.body as HTMLBodyElement;
    this.backgrounds = BACKGROUNDS;
    this.loop = this.loop.bind(this);

    this.loop((e) => {
      const el = this.d.querySelector(`.${e.name}`);
      if (el instanceof HTMLVideoElement) {
        el.play().catch(() => {
          el.poster = '/static/images/school-cycling_galeria-banner.jpeg';
        });
      }
    });
  }

  private loop(f: (e: IBackgrounds) => void) {
    this.backgrounds.map(f);
  }

  public show(name: string) {
    // if(name in this.backgrounds) console.log("yes!")
    this.loop((e) => {
      if (e.name === name) {
        const x = this.d.querySelector(`.${e.name}.is-secondary`);
        x?.classList.add('is-shown');
      }
    });
  }

  public hide(name: string) {
    this.loop((e) => {
      if (e.name === name) {
        const x = this.d.querySelector(`.${e.name}.is-secondary`);
        x?.classList.remove('is-shown');
      }
    });
  }
}
