// import imagesLoaded from 'imagesloaded';
// import Masonry from 'masonry-layout';

// export class Galeria {}

// const grid = document.querySelector('.grid');

// const msnry = new Masonry(grid, {
//   itemSelector: 'none', // select none at first
//   columnWidth: '.grid__col-sizer',
//   gutter: '.grid__gutter-sizer',
//   percentPosition: true,
//   stagger: 30,
//   // nicer reveal transition
//   visibleStyle: { transform: 'translateY(0)', opacity: 1 },
//   hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
// });

// // initial items reveal
// imagesLoaded(grid, function () {
//   grid.classList.remove('are-images-unloaded');
//   msnry.data
//   const items = grid.querySelectorAll('.grid__item');
//   msnry.appended(items);
// });

// // -------------------------------------//
// // hack CodePen to load pens as pages

// const nextPenSlugs = [
//   '202252c2f5f192688dada252913ccf13',
//   'a308f05af22690139e9a2bc655bfe3ee',
//   '6c9ff23039157ee37b3ab982245eef28',
// ];

// function getPenPath() {
//   const slug = nextPenSlugs[this.loadCount];
//   if (slug) {
//     return `/desandro/debug/${slug}`;
//   }
// }

// // -------------------------------------//
// // init Infinte Scroll

// const infScroll = new InfiniteScroll(grid, {
//   path: getPenPath,
//   append: '.grid__item',
//   outlayer: msnry,
//   status: '.page-load-status',
// });

// import 'fslightbox';

// import imagesLoaded from 'imagesloaded';
// import Masonry from 'masonry-layout';

// import { GALLERY_API_LINK } from '../constants/system';

// export interface FetchedData {
//   src: string;
//   height: number;
//   width: number;
// }

// export interface FetchError {
//   reason: string;
// }

// export class Galeria {
//   d: Document;

//   b: HTMLBodyElement;

//   w: Window;

//   root: HTMLElement | null;

//   loader: HTMLElement | null;

//   loadItem: number;

//   msnry: Masonry | null;

//   imagesDelay: (n: number) => number;

//   remainingImages: FetchedData[];

//   API_LINK: string;

//   constructor(selector: string) {
//     this.d = document;
//     this.b = this.d.body as HTMLBodyElement;
//     this.root = this.d.querySelector(selector);
//     this.loader = this.d.querySelector('.loader-grid');
//     this.loadItem = 4;
//     this.w = window;

//     this.remainingImages = [];

//     this.imagesDelay = (n) => n / 12;

//     this.API_LINK = GALLERY_API_LINK;

//     this.msnry = this.root
//       ? new Masonry(this.root, {
//           itemSelector: '.grid-item',
//           columnWidth: '.grid-sizer',
//           percentPosition: true,
//           transitionDuration: 0,
//         })
//       : null;

//     this.fetchImages = this.fetchImages.bind(this);

//     this.Init();
//   }

//   private areLoaded(f: ImagesLoaded.ImagesLoadedCallback) {
//     if (this.root) imagesLoaded(this.root, f);
//   }

//   private getMaxItemLoad(d: FetchedData[]) {
//     const l = d.length;
//     const a = l > this.loadItem ? this.loadItem : l;
//     return a;
//   }

//   private updateGrid() {
//     if (this.msnry && this.msnry.reloadItems && this.msnry.layout) {
//       this.msnry.reloadItems();
//       this.msnry.layout();
//     }
//   }

//   private async Init() {
//     try {
//       if (!this.root)
//         throw new Error('No se encontró el elemento principal o el loader.');
//       this.root.removeAttribute('style');
//       const d = await this.fetchImages();
//       const a: FetchedData[] = d as FetchedData[];
//       this.remainingImages = [...a];
//       // console.log("Initial array:", this.remainingImages);
//       const m = this.getMaxItemLoad(d);
//       this.addImages([0, m], (n) => {
//         if (this.root && this.loader && this.msnry) {
//           this.loader.remove();
//           this.root.classList.add('is-loaded');
//           // console.log(this.msnry);
//           this.setFirstTimeGrid();
//           // console.log(this.updateGrid())
//           this.updateGrid();
//           this.remainingImages = n;
//           // console.log(this.getNumberOfImages())
//           if (
//             this.getMaxItemLoad(this.remainingImages) <=
//             this.remainingImages.length
//           )
//             this.initScrollService();
//         }
//       });
//     } catch (error) {
//       console.warn(error);
//     }
//   }

//   private getNumberOfImages() {
//     if (this.root) {
//       const a = this.root.querySelectorAll('.grid-item');
//       return a.length;
//     }
//     return 0;
//   }

//   private setFirstTimeGrid() {
//     if (this.root) {
//       // Create grid sizer
//       const a = this.d.createElement('div');
//       a.className = 'grid-sizer';
//       this.root.appendChild(a);
//     }
//   }

//   private initScrollListener(f: (e: Event) => any) {
//     this.w.addEventListener('scroll', f);
//   }

//   private removeScrollListener() {
//     this.w.removeEventListener('scroll', () => {});
//   }

//   private initScrollService() {
//     const init = () => {
//       const reInitialize = () => {
//         this.removeScrollListener();
//         init();
//       };
//       this.initScrollListener(() => {
//         const offset =
//           this.w.getBoundingClientRect().top -
//           this.w.offsetParent.getBoundingClientRect().top;
//         const top = window.pageYOffset + window.innerHeight - offset;

//         if (top === this.w.scrollHeight) {
//           this.appendMore(() => {
//             reInitialize();
//             console.log('Ended');
//           });
//         }
//       });
//     };
//     init();
//   }

//   private appendMore(cb: () => any) {
//     this.addImages([0, this.loadItem], (i) => {
//       if (this.remainingImages.length === 0) {
//         cb();
//       } else {
//         this.remainingImages = i;
//         this.updateGrid();
//         cb();
//       }
//     });
//   }

//   private addImages(limit: number[], cb?: (na: FetchedData[]) => void) {
//     let a = 0;
//     const d = this.remainingImages;
//     d.forEach((b, i) => {
//       if (i >= limit[0] && i <= limit[1]) {
//         a += 1;
//         // console.log(i);
//         this.appendImage(b.src, this.imagesDelay(a));
//       }
//     });
//     this.areLoaded((i) => {
//       // console.log(i)
//       i?.images.forEach((image) => {
//         image.img.classList.add('is-loaded');
//       });
//       const na = this.remainingImages.slice(limit[1] + 1);
//       refreshFsLightbox();
//       if (cb) cb(na);
//     });
//   }

//   // private static getRandom(min: number, max: number) {
//   //   return Math.random() * (max - min) + min;
//   // }

//   private appendImage(src: string, delay: number) {
//     // <div>
//     //     <img src="https://assets.codepen.io/12005/windmill.jpg" alt="A windmill" />
//     // </div>
//     const a = this.d.createElement('div');
//     a.className = 'grid-item';
//     const b = this.d.createElement('a');
//     b.dataset.fslightbox = 'schoolCycling';
//     b.href = src;
//     const c = this.d.createElement('img');
//     c.src = src;
//     c.alt = src;
//     c.style.transitionDelay = `${delay}s, ${delay}s, ${delay}s, 0s`;
//     b.appendChild(c);
//     a.appendChild(b);
//     if (this.root) this.root.appendChild(a);
//   }

//   private fetchImages() {
//     return new Promise(
//       // eslint-disable-next-line no-async-promise-executor
//       async (
//         res: (value: FetchedData[]) => any,
//         rej: (reason: FetchError) => any
//       ) => {
//         try {
//           const options: RequestInit = { method: 'GET' };
//           const a = await fetch(this.API_LINK, options);
//           const b: FetchedData[] = await a.json();
//           res(b);
//         } catch (error: any) {
//           const x: FetchError = { reason: error.message || error };
//           rej(x);
//         }
//       }
//     );
//   }
// }

export {};
