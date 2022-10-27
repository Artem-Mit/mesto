import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitForm) {
    super(popupElement);
    this._form = this._popup.querySelector(".popup__form");
    this._submitForm = submitForm;
    this._inputs = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    return this._inputs.reduce((data, input) => {
      data[input.name] = input.value;
      return data;
    }, {});
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this.renderLoading(true);
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = "Сохранение...";
    } else {
      this._popupSubmitButton.textContent = "Сохранить";
    }
  }
}
