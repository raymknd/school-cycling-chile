import { newTitle } from './Functions';

class Share {
  private WHATSAPP_API: string;

  private FACEBOOK_API: string;

  private TWITTER_API: string;

  constructor() {
    this.WHATSAPP_API = 'https://api.whatsapp.com';
    this.FACEBOOK_API = 'https://www.facebook.com';
    this.TWITTER_API = 'https://twitter.com';
  }

  public whatsapp(title: string, link: string) {
    const text = `${newTitle(title)} - ${link}`;
    return `${this.WHATSAPP_API}/send?text=${encodeURIComponent(text)}`;
  }

  public facebook(link: string) {
    return `${this.FACEBOOK_API}/sharer/sharer.php?u=${link}`;
  }

  public twitter(title: string, link: string) {
    const text = `${newTitle(title)}`;
    return `${this.TWITTER_API}/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${link}`;
  }
}

export { Share };
