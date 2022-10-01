import {openPopup, popupBigImg, popupImg} from './index.js';


class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._src = data.link;
    this._alt = this._title;
    this._templateSelector = templateSelector;
  }
// Получить шаблон
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.
      querySelector('.element')
      .cloneNode(true)
  }
// Функцонал кнопки "лайк"
  _likeBtnHandler() {
    this._likeBtn.classList.toggle(`element__like-btn_active`);
  }
// Функционал кнопки "корзина"
  _deleteBtnHandler() {
    this._deleteBtn.parentElement.remove();
  }
// Функционал открытия большого изображения
  _openBigImgHandler() {
    openPopup(popupBigImg);
    popupImg.src = this._src;
    popupImg.alt = this._alt;
    popupBigImg.querySelector(`.img-popup__caption`).textContent = this._title;
  }
// Установка слушателей событий
  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.element__like-btn');
    this._deleteBtn = this._element.querySelector('.element__delete-btn');
    this._likeBtn.addEventListener('click', () => this._likeBtnHandler());
    this._deleteBtn.addEventListener('click', () => this._deleteBtnHandler());
    this._img.addEventListener('click', () => this._openBigImgHandler());
  }
// Функционал возвращающий сгенерированную карточку
  generateCard() {
    this._element = this._getTemplate();

    this._img = this._element.querySelector('.element__img');
    this._titleName = this._element.querySelector('.element__title');

    this._img.src = this._src;
    this._img.alt = this._alt;
    this._titleName.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}

export {Card};
