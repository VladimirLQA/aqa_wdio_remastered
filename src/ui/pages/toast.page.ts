
class ToastPage {
  readonly ['Toast container'] = 'div.toast-container';
  readonly ['Toast text'] = `${this['Toast container']} .toast-body`;
  readonly ['Toast close button'] = '.toast-container button';
}

export default new ToastPage();
