import Popup from "./Popup.js";

export default class PopupDeleteCardConfirm extends Popup{
  constructor (popupSelector) {
    super(popupSelector)
    this._buttonConfirm = this._popup.querySelector('.popup__button')
  }

  setEventListeners(){
    super.setEventListeners()
    this._buttonConfirm.addEventListener('click', (evt) => {
      console.log(evt.target)
      super.close()
    })
  }
}
