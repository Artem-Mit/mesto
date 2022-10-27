export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }
  renderItems(data, myId) {
    data.forEach((item) => {
      this._renderer(item, myId);
    });

  }
  addItem(element, first) {
    if (first) {
      this._containerSelector.prepend(element);
    } else {
      this._containerSelector.append(element);
    }
  }
}
