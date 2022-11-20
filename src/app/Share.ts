interface IIcons {
  success: HTMLDivElement | undefined;
  default: HTMLDivElement | undefined;
  loading: HTMLDivElement | undefined;
  error: HTMLDivElement | undefined;
}

class Share {
  d: Document;

  b: HTMLBodyElement;

  root: HTMLAnchorElement | undefined;

  datasetName: string;

  icons: IIcons;

  text: string;

  link: string;

  constructor(selector: string) {
    this.d = document;
    this.b = this.d.body as HTMLBodyElement;
    this.root = this.d.querySelector(selector);
    this.datasetName = 'sharedata';
    this.icons = {
      success: this.d.querySelector(`${selector} .fa-circle-check`),
      default: this.d.querySelector(`${selector} .fa-link`),
      loading: this.d.querySelector(`${selector} .fa-circle-notch`),
      error: this.d.querySelector(`${selector} .fa-triangle-exclamation`),
    };

    this.Init = this.Init.bind(this);
    this.initClickListener = this.initClickListener.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.share = this.share.bind(this);

    this.Init();
  }

  private Init() {
    this.initClickListener(async (e) => {
      e.preventDefault();
      if (this.root.classList.contains('disabled')) return;
      this.setLoading();
      this.setRootDisabled(true);
      try {
        await this.share();
        this.setStateWithTimeout('success');
      } catch (err) {
        try {
          await this.copy();
          this.setStateWithTimeout('success');
        } catch (latestErr) {
          this.setStateWithTimeout('error');
        }
      }
    });
  }

  private setStateWithTimeout(
    state: 'default' | 'success' | 'loading' | 'error',
    time?: number
  ) {
    const getMethod = () => {
      switch (state) {
        case 'success':
          return this.setSuccess();
        case 'error':
          return this.setError();
        case 'loading':
          return this.setLoading();
        case 'default':
        default:
          return this.setDefault();
      }
    };
    getMethod();
    const t = setTimeout(() => {
      this.setDefault();
      this.setRootDisabled(false);
      clearTimeout(t);
    }, time || 2000);
  }

  private async share() {
    const d = JSON.parse(this.root.dataset[this.datasetName]) as ShareData;
    const data: ShareData = d;
    await navigator.share(data);
  }

  private async copy() {
    const d = JSON.parse(this.root.dataset[this.datasetName]) as ShareData;
    const data: ShareData = d;
    const text = `${data.text} - ${data.url}`;
    await navigator.clipboard.writeText(text);
  }

  private initClickListener(f: (e: MouseEvent) => any) {
    this.root.addEventListener('click', f);
  }

  private setRootDisabled(s: boolean) {
    if (s) {
      this.root.classList.add('disabled');
    } else {
      this.root.classList.remove('disabled');
    }
  }

  private setSuccess() {
    this.icons.default.setAttribute('hidden', '');
    this.icons.loading.setAttribute('hidden', '');
    this.icons.error.setAttribute('hidden', '');
    this.icons.success.removeAttribute('hidden');
  }

  private setError() {
    this.icons.default.setAttribute('hidden', '');
    this.icons.loading.setAttribute('hidden', '');
    this.icons.success.setAttribute('hidden', '');
    this.icons.error.removeAttribute('hidden');
  }

  private setLoading() {
    this.icons.default.setAttribute('hidden', '');
    this.icons.success.setAttribute('hidden', '');
    this.icons.error.setAttribute('hidden', '');
    this.icons.loading.removeAttribute('hidden');
  }

  private setDefault() {
    this.icons.loading.setAttribute('hidden', '');
    this.icons.success.setAttribute('hidden', '');
    this.icons.error.setAttribute('hidden', '');
    this.icons.default.removeAttribute('hidden');
  }
}

export { Share };
