// Открытие Popup
let profileEditButton = document.querySelector(`.profile__edit-button`);
let popup = document.querySelector(`.popup`)
function popupOpener() {
  popup.classList.add(`popup_opened`);
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
}
profileEditButton.addEventListener(`click`,popupOpener);

// Закрыть Popup
let closePopup = document.querySelector(`.popup__close`);
function popupCloser() {
  popup.classList.remove(`popup_opened`);
}
closePopup.addEventListener(`click`,popupCloser);


// Работа формы
// Находим форму в DOM
let formElement = document.querySelector(`.popup__container`);
// Находим поля формы в DOM
let nameInput = formElement.name;
let jobInput = formElement.job;
let nameField = document.querySelector(`.profile__name`);
let jobField = document.querySelector(`.profile__profession`);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    popupCloser()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function ({name, link}) {
  const elementTemplate = document.querySelector(`#element`).content;
  const photos = document.querySelector(`.photos`);
  const photoElement = elementTemplate.querySelector(`.element`).cloneNode(true);
  photoElement.querySelector(`.element__img`).src = link;
  photoElement.querySelector(`.element__img`).alt = `Фото ${name}`;
  photoElement.querySelector(`.element__title`).textContent = name;
  photos.append(photoElement);
});


