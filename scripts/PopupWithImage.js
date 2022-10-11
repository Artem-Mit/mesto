import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._img = this._popup.querySelector('.img-popup__img');
    this._caption = this._popup.querySelector('.img-popup__caption');
  }

  open(link, title) {
    super.open();
    super.setEventListeners();
    this._img.src = link;
    this._img.alt = title;
    this._caption.textContent = title;

  }
}
