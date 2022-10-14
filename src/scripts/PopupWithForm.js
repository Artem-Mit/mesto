import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitForm){
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    return this._inputs.reduce((data, input) => {
      data[input.name] = input.value;
      return data;
    }, {});
  }

  _closePopupwithForm(){
    this._form.reset();
    super.close();
    }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this._closePopupwithForm();
    })
  }
}
