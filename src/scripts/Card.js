export default class Card {
  constructor(data, templateSelector, handleCardClick, deleteCardClick, useLikeOnCard, userId) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._author = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardClick = deleteCardClick;
    this._userId = userId;
    this._useLikeOnCard = useLikeOnCard;
    this._cardIsLiked = Boolean(data.likes.length >= 0);
    this._likedByMyself = Boolean(this._likes.find((like) => like._id === this._userId))
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
    this._deleteCardClick()
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

// Функционал открытия большого изображения
  _openBigImgHandler() {
    this._handleCardClick(this._link, this._title);
  }
// Функцонал кнопки "лайк"
  _likeBtnHandler() {
    this._useLikeOnCard(this._likedByMyself)
  }

  addLike(number) {
    this._likeBtn.classList.add('element__like-btn_active');
    this._element.querySelector('.element__like-counter').textContent = number;
  }

  deleteLike(number) {
    this._likeBtn.classList.remove('element__like-btn_active');
    this._element.querySelector('.element__like-counter').textContent = number;
  }

// Установка слушателей событий
  _setEventListeners() {
    this._likeBtn = this._element.querySelector('.element__like-btn');
    this._deleteBtn = this._element.querySelector('.element__delete-btn');
    this._likeBtn.addEventListener('click', () => this._likeBtnHandler());
    this._deleteBtn.addEventListener('click', () => this._deleteBtnHandler());
    this._img.addEventListener('click', () => this._openBigImgHandler());
  }

  _removeDeleteBtn() {
    if (this._userId !== this._author) {
      this._deleteBtn.classList.add('element__delete-btn_hide')
    }
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
    this._removeDeleteBtn()
    if (this._cardIsLiked) {
      this._element.querySelector('.element__like-counter').textContent = this._likes.length;
    }
    if (this._likedByMyself) {
      this._likeBtn.classList.add('element__like-btn_active');
    }
    return this._element;
  }

}
