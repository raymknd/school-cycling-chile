import 'fslightbox';

import imagesLoaded from 'imagesloaded';
import Masonry from 'masonry-layout';

import { GALLERY_API_LINK } from '../constants/system';

interface IFetch extends RequestInit {
  page: number;
}

interface IResData {
  src: string;
  width: number;
  height: number;
}

interface IGalleryRes {
  filesLength: number;
  code: number;
  message: string;
  page: number;
  data: IResData[] | null;
}

interface IMasonrySelectors {
  itemSelector: string;
  columnWidth: string;
  gutter: string;
}

export class Galeria {
  private d: Document;

  // private w: Window;

  // private b: HTMLBodyElement;

  public root: HTMLElement | null;

  public msnrySelectors: IMasonrySelectors;

  public msnry: Masonry;

  private gridColSizer: HTMLElement | null;

  private gridGutterSizer: HTMLElement | null;

  private loader: HTMLElement | null;

  private afterLoader: HTMLElement | null;

  private pageCount: number;

  private busy: boolean;

  private maxItems: number | null;

  private fullContent: HTMLElement | null;

  private errorContainer: HTMLElement | null;

  private emptySet: HTMLElement | null;

  private patrocinadores: HTMLElement | null;

  private footer: HTMLElement | null;

  constructor(rootSelector: string) {
    this.d = document;
    // this.w = window;
    // this.b = this.d.body as HTMLBodyElement;

    this.root = this.d.querySelector(rootSelector);

    this.msnrySelectors = {
      itemSelector: '.gridItem',
      columnWidth: '.gridColSizer',
      gutter: '.gridGutterSizer',
    };

    this.loader = this.d.querySelector('.loader-grid');

    this.afterLoader = this.d.querySelector('#js--gallery-loader');

    this.gridColSizer = this.d.querySelector(this.msnrySelectors.columnWidth);
    this.gridGutterSizer = this.d.querySelector(this.msnrySelectors.gutter);

    this.msnry = new Masonry(this.root as Element, {
      ...this.msnrySelectors,
      percentPosition: true,
      stagger: 30,
      visibleStyle: { transform: 'translateY(0)', opacity: 1 },
      hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
    });

    this.pageCount = 1;

    this.maxItems = null;

    this.busy = false;

    this.fullContent = this.d.querySelector('#js--gallery-full');
    this.errorContainer = this.d.querySelector('#js--gallery-error');
    this.emptySet = this.d.querySelector('#js--gallery-empty');

    this.patrocinadores = this.d.getElementById(
      'school-cycling_patrocinadores'
    );
    this.footer = this.d.getElementById('school-cycling_footer');

    this.init = this.init.bind(this);
    this.appendPage = this.appendPage.bind(this);
    this.isFull = this.isFull.bind(this);
    this.infiniteScrollHandler = this.infiniteScrollHandler.bind(this);
    this.setFull = this.setFull.bind(this);

    this.init();
  }

  // eslint-disable-next-line class-methods-use-this
  private async fetch(res: (d: IGalleryRes) => any, o?: IFetch, err?: any) {
    const { page, ...opt } = o;
    const options = { ...opt } as RequestInit;
    const url = page ? `${GALLERY_API_LINK}?page=${page}` : GALLERY_API_LINK;

    fetch(url, options)
      .then((e) => e.json())
      .then((a) => {
        res(a);
      })
      .catch(err);
  }

  private newImage(src: string, alt: string) {
    const a = new Image();
    a.className = 'innerImage';
    a.src = src;
    a.alt = alt;
    const anchor = this.d.createElement('a');
    anchor.href = src;
    anchor.dataset.fslightbox = 'schoolCycling_galería';
    anchor.append(a);
    const b = this.d.createElement('div');
    b.style.opacity = '0';
    b.className = this.msnrySelectors.itemSelector.replace('.', '');
    b.append(anchor);
    return b;
  }

  private clearRoot() {
    if (this.loader) this.loader.remove();
  }

  private setGridBasics() {
    const a = this.d.createElement('div');
    a.className = this.msnrySelectors.columnWidth.replace('.', '');
    const b = this.d.createElement('div');
    b.className = this.msnrySelectors.gutter.replace('.', '');
    this.root.append(a);
    this.root.append(b);
  }

  private setLoaderVisible(visible: boolean, absolute?: boolean) {
    if (visible) {
      this.afterLoader.hidden = false;
    } else {
      this.afterLoader.hidden = true;
    }
    if (absolute) {
      this.afterLoader.style.position = 'absolute';
      this.afterLoader.style.width = '100%';
      this.afterLoader.style.top = '50px';
      this.afterLoader.style.left = '0';
      this.afterLoader.style.zIndex = '100';
    } else {
      this.afterLoader.removeAttribute('style');
    }
  }

  private getItemCount() {
    const a = this.root.querySelectorAll(this.msnrySelectors.itemSelector);
    return a.length;
  }

  private setEmpty() {
    if (this.emptySet) this.emptySet.hidden = false;
  }

  private setFull() {
    if (this.fullContent) this.fullContent.hidden = false;
  }

  private setError() {
    if (!this.loader.hidden) this.setLoaderVisible(false);
    if (this.errorContainer) this.errorContainer.hidden = false;
  }

  public isFull() {
    if (this.maxItems === null) return false;
    const condition = this.maxItems <= this.getItemCount();
    return condition;
  }

  private async appendPage(
    page: number,
    initial: boolean,
    err?: (e: string) => any,
    done?: () => any
  ) {
    this.setLoaderVisible(true, initial);
    this.busy = true;
    await this.fetch(
      (a) => {
        if (!a.data) {
          err('No hay datos validos desde la api');
          throw new Error('No hay datos validos desde la api');
        }
        if (a.message === 'OK') {
          if (this.maxItems === null) this.maxItems = a.filesLength;
          const elementsArray: any[] = [];
          a.data.forEach((d, i) => {
            const img = this.newImage(d.src, `Imagen N°${i + 1}`);
            elementsArray.push(img);
            this.root.appendChild(img);
          });
          this.msnry.layout();
          refreshFsLightbox();
          imagesLoaded(elementsArray, () => {
            this.setLoaderVisible(false, false);
            this.msnry.appended(elementsArray);
            this.pageCount += 1;
            this.busy = this.isFull();
            if (this.isFull()) {
              this.setFull();
            }
            if (done) done();
          });
        } else {
          err('Hubo un error interno');
        }
      },
      { page },
      (e: any) => {
        if (err) err(e);
      }
    );
  }

  private async init() {
    try {
      if (!this.gridColSizer || !this.gridGutterSizer) {
        this.clearRoot();
        this.setGridBasics();
      }

      await this.appendPage(
        1,
        true,
        () => {
          this.setError();
        },
        () => {
          if (this.maxItems === 0) this.setEmpty();
        }
      );

      window.addEventListener('scroll', this.infiniteScrollHandler);
    } catch (error) {
      if (!this.gridColSizer || !this.gridGutterSizer) {
        this.clearRoot();
        this.setGridBasics();
      }
      this.setError();
    }
  }

  private async infiniteScrollHandler() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const patrocinadoresHeight = this.patrocinadores.clientHeight;
    const footerHeight = this.footer.clientHeight;
    const totalHeight = patrocinadoresHeight + footerHeight + 200;
    if (
      scrollTop + clientHeight >= scrollHeight - totalHeight &&
      !this.isFull() &&
      !this.busy
    ) {
      this.appendPage(this.pageCount, false, () => {
        this.setError();
      });
    }
  }
}
