export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._rendereditems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._rendereditems.forEach((item) => {
      this._renderer(item);
    });
  }

  additem(element) {
    this._container.append(element);
  }
}
