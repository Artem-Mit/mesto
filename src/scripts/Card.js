export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
// Получить шаблон
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.
      querySelector('.element')
      .cloneNode(true)
  }
// Функционал кнопки "корзина"
  _deleteBtnHandler() {
    this._element.remove();
    this._element = null;
  }
// Функционал открытия большого изображения
  _openBigImgHandler() {
    this._handleCardClick(this._link, this._title);
  }
// Функцонал кнопки "лайк"
  _likeBtnHandler() {
    this._likeBtn.classList.toggle(`element__like-btn_active`);
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
    this._img.src = this._link;
    this._img.alt = this._title;
    this._titleName.textContent = this._title;
    this._setEventListeners();
    return this._element;
  }
}
