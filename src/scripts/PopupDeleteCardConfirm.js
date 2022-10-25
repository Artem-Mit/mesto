import Popup from "./Popup.js";

export default class PopupDeleteCardConfirm extends Popup{
  constructor (popupSelector, func) {
    super(popupSelector)
    this._buttonConfirm = this._popup.querySelector('.popup__button');
    this._func = func;
  }

  open(data){
    super.open()
    this._data = data;
  }

  setEventListeners(){
    super.setEventListeners()
    this._buttonConfirm.addEventListener('click', () => {
      this._func(this._data)
      super.close()
    })
  }
}
