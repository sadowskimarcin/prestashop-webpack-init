export abstract class ViewController {
  constructor(selector: string) {
    this.init(selector);
  }

  private init(selector: string): void {
    $(() => {
      const $el = $(selector);
      if ($el.length > 0) {
        this._onInit();
      }
    });
  }

  protected _onInit(): void {
    // inheritable
  }
}
