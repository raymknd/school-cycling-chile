import type { IPlanProps } from '@/partials/Plan';

import { WHATSAPP_LINK } from './system';

export interface IBackgrounds {
  name: string;
  src: string;
  type: 'video' | 'image';
  className?: string;
}

export interface IRRSS {
  name: string;
  href: string;
  iconClasses: string;
}

export interface IPatrocinadores {
  name: string;
  link: string;
  image: string;
}

const PROVIDER_DATA = {
  provider: 'Mercado Pago',
  href: {
    monthly: 'https://mpago.la/1VyZx6F',
    quarterly: 'https://mpago.la/2xs8B6M',
    annually: 'https://mpago.la/2rNN3dp',
  },
};

const PLANES_SHARED_DATA = {
  monthly: {
    bankTransfer: '70.000',
    paymentGateway: '72.660',
  },
  quarterly: {
    bankTransfer: '195.000',
    paymentGateway: '202.410',
  },
  annually: {
    bankTransfer: '720.000',
    paymentGateway: '747.360',
  },
};

const PLANES_SHARED_PRICES: IPlanProps['price'] = {
  monthly: {
    bankTransfer: {
      href: '',
      price: PLANES_SHARED_DATA.monthly.bankTransfer,
    },
    paymentGateway: {
      provider: PROVIDER_DATA.provider,
      href: PROVIDER_DATA.href.monthly,
      price: PLANES_SHARED_DATA.monthly.paymentGateway,
    },
  },
  quarterly: {
    bankTransfer: {
      href: '',
      price: PLANES_SHARED_DATA.quarterly.bankTransfer,
    },
    paymentGateway: {
      provider: PROVIDER_DATA.provider,
      href: PROVIDER_DATA.href.quarterly,
      price: PLANES_SHARED_DATA.quarterly.paymentGateway,
    },
  },
  annually: {
    bankTransfer: {
      href: '',
      price: PLANES_SHARED_DATA.annually.bankTransfer,
    },
    paymentGateway: {
      provider: PROVIDER_DATA.provider,
      href: PROVIDER_DATA.href.annually,
      price: PLANES_SHARED_DATA.annually.paymentGateway,
    },
  },
};

export const PLANES: IPlanProps[] = [
  {
    title: 'Plan Primeros Pasos',
    price: PLANES_SHARED_PRICES,
    number: '01',
    hasIn: true,
    hasOut: true,
    bgColor: '#E8C617',
    description:
      'Este plan de entrenamiento es ideal para personas que se están iniciando en el ciclismo. Consta de un período de adaptación anatómica de baja intensidad para fortalecer y adaptar tejido muscular, oseo y tendinoso. También genera un trabajo aeróbico que es la base para recibir estímulos más grandes previniendo lesiones a futuro',
  },
  {
    title: 'Plan para ciclismo de gran fondo',
    price: PLANES_SHARED_PRICES,
    number: '02',
    hasIn: false,
    hasOut: false,
    bgColor: '#fff',
    description:
      'En este plan de entrenamiento se focaliza en uno o más objetivos como meta. Es ideal para personas que desean preparar competencias de larga distancia, sobre los 120km.  Si logras cumplir con los entrenamientos llegaras preparado/a y podrás superar la barrera de los calambres por fatiga muscular.',
  },
  {
    title: 'Plan para ciclistas de ruta',
    price: PLANES_SHARED_PRICES,
    number: '03',
    hasIn: true,
    hasOut: true,
    bgColor: '#00E9E9',
    description:
      'Este plan de entrenamiento es enfocado a ciclistas de ruta que se dedican a la alta competencia. Podemos hablar de un plan de entrenamiento para deportista de alto rendimiento que se preparan para participar en algún ranking o campeonato importante a nivel federado.',
  },
  {
    title: 'Plan MTB XCO (Cross Country Olímpico)',
    price: PLANES_SHARED_PRICES,
    number: '04',
    hasIn: false,
    hasOut: false,
    bgColor: '#fff',
    description:
      'El plan de entrenamiento para ciclistas de MTB XCO consiste en llevar una calendarizacion con contenido deportivo que te ayudará a mejorar la fuerza, la resistencia, la potencia y la técnica sobre la bicicleta. Esto beneficia al deportista a mantener una condición física  óptima y llegar a un peak deportivo en cada competencia.',
  },
  {
    title: 'Plan MTB XCM (Cross Country Marathon)',
    price: PLANES_SHARED_PRICES,
    number: '05',
    hasIn: true,
    hasOut: true,
    bgColor: '#E8C617',
    description:
      'Para superar distancias largas, necesitarás un trabajo que permita optimizar tus tiempos y así poder llegar al nivel que deseas. Es por esto que el plan de entrenamiento para XCM, esta pensado en mejorar la condición física y resistencia física para tolerar estímulos físicos grandes pero con duraciones más largas. Podrás llegar preparado a tu competencia y sentir sensaciones de mejora en cada una de ellas.',
  },
  {
    title: 'Plan para ciclistas Gravel',
    price: PLANES_SHARED_PRICES,
    number: '06',
    hasIn: false,
    hasOut: false,
    bgColor: '#fff',
    description:
      'El gravel se ha convertido en una popular disciplina que te permite recorrer lugares impensados. Es por esto que nosotros solicitamos un feedback de la persona que desea comenzar este plan de entrenamiento, para saber si sus objetivos son competitivos o simplemente personales para poder disfrutar de este deporte.',
  },
];
export const BACKGROUNDS: IBackgrounds[] = [
  {
    name: 'home',
    src: '/static/video/school-cycling_home-video.mp4',
    type: 'video',
  },
  {
    name: 'acercaDe',
    src: '/static/images/school-cycling_acercaDe-banner.jpeg',
    type: 'image',
  },
  {
    name: 'galeria',
    src: '/static/images/school-cycling_galeria-banner.jpeg',
    type: 'image',
  },
  {
    name: 'planes',
    src: '/static/images/school-cycling_planes-banner.jpeg',
    type: 'image',
    className: 'object-bottom',
  },
];

export const RRSS: IRRSS[] = [
  {
    name: 'Whatsapp',
    href: WHATSAPP_LINK,
    iconClasses: 'fa-brands fa-whatsapp',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/school.cycling.chile/',
    iconClasses: 'fa-brands fa-instagram',
  },
  // {
  //   name: 'Facebook',
  //   href: '',
  //   iconClasses: 'fa-brands fa-facebook',
  // },
];

export const PATROCINADORES: IPatrocinadores[] = [
  {
    name: 'Rehab',
    link: 'https://rehabsport.cl',
    image: '/static/images/cropped-gen_logo.png',
  },
  {
    name: 'Skyland',
    link: 'https://fulldeportes.cl/categoria-producto/marcas/skyland/',
    image: '/static/images/logo-skyland.png',
  },
  {
    name: 'Full Deportes',
    link: 'https://fulldeportes.cl',
    image: '/static/images/fulldeportes-logo-sc.png',
  },
  {
    name: 'Nutrend',
    link: 'https://www.nutrend.cl',
    image: '/static/images/nutrend-logo.webp',
  },
  {
    name: 'Limpo',
    link: 'https://limpoapp.cl',
    image: '/static/images/logo_color.svg',
  },
];
