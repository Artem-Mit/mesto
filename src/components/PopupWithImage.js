import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupElement) {
    super (popupElement);
    this._img = this._popup.querySelector('.img-popup__img');
    this._caption = this._popup.querySelector('.img-popup__caption');
  }

  open(link, title) {
    this._img.src = link;
    this._img.alt = title;
    this._caption.textContent = title;
    super.open();
  }
}
