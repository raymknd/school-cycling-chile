import { WHATSAPP_LINK } from '@/constants/system';

import { AppConfig } from './AppConfig';

export const newTitle = (title: string) => {
  return `${AppConfig.title} ▸ ${title}`;
};

export const newWhatsappMessage = (msg: string) => {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(msg)}`;
};

export function iOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}
