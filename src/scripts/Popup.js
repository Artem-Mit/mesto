export default class Popup {
  constructor (popupElement) {
    this._popup = popupElement;
    this._popupCloseButton = this._popup.querySelector('.popup__close');
    this._popupSubmitButton = this._popup.querySelector('.popup__button');
    this._form = this._popup.querySelector('.popup__container')
  }

  open() {
    this._popup.classList.add(`popup_opened`);
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove(`popup_opened`);
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close()
    };
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
    });

    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}
