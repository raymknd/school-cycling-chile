export class Modal {
  private d: Document;

  private b: HTMLBodyElement;

  private overflow: boolean;

  private root: HTMLElement | null;

  private closeButtons: NodeListOf<HTMLElement> | null;

  public actionButton: HTMLAnchorElement | null;

  private backdrop: HTMLElement | null;

  constructor(selector: string, overflow?: boolean) {
    this.d = document;
    this.b = this.d.body as HTMLBodyElement;
    this.overflow = overflow;
    this.root = this.d.querySelector(selector);
    this.closeButtons = this.root.querySelectorAll('[data-modal=close]');
    this.actionButton = this.root.querySelector('[data-modal=actionBtn]');
    this.backdrop = this.d.querySelector(`[data-backdrop="${selector}"]`);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.initListener = this.initListener.bind(this);

    this.initListener((e) => {
      e.preventDefault();
      this.close();
    });
  }

  private initListener(f: (e: MouseEvent) => any) {
    if (this.closeButtons)
      this.closeButtons.forEach((c) => {
        c.addEventListener('click', f);
      });
  }

  public open() {
    if (this.root) this.root.dataset.open = 'true';
    if (this.backdrop) this.backdrop.dataset.open = 'true';
    if (this.b.style.overflow !== 'hidden' && this.overflow)
      this.b.style.overflow = 'hidden';
  }

  public close() {
    if (this.root) this.root.dataset.open = 'false';
    if (this.backdrop) this.backdrop.dataset.open = 'false';
    if (this.actionButton) this.actionButton.href = '';
    if (this.b.style.overflow === 'hidden' && this.overflow)
      this.b.style.overflow = '';
  }
}
