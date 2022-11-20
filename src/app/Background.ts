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
