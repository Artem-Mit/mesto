import { Card } from "./Card.js";
import { FormValidation } from "./validate.js";

const photos = document.querySelector(`.photos`);
const popupProfileOpenButton = document.querySelector(`.profile__edit-button`);
const popupAddOpenButton = document.querySelector(`.profile__add-button`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupNewCard = document.querySelector(`.add-popup`);
export const popupBigImg = document.querySelector(`.img-popup`);
export const popupImg = popupBigImg.querySelector(`.img-popup__img`);
const profileCloseBtn = document.querySelector(`.profile-popup__close`);
const addCloseBtn = document.querySelector(`.add-popup__close`);
const imgCloseBtn = document.querySelector(`.img-popup__close`);
const profileFormElement = document.querySelector(`.profile-popup__container`);
const nameInput = profileFormElement.name;
const jobInput = profileFormElement.job;
const nameField = document.querySelector(`.profile__name`);
const jobField = document.querySelector(`.profile__profession`);
const newCardForm = document.querySelector(`.add-popup__container`);
const imgNameInput = newCardForm.img;
const srcInput = newCardForm.source;
const popups = Array.from(document.querySelectorAll('.popup'));

// Включение валидации
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const addFormValidation = new FormValidation(newCardForm, config);
addFormValidation.enableFormValidation();
const profileFormValidation = new FormValidation(profileFormElement, config);
profileFormValidation.enableFormValidation();

function createCard(name,link) {
  const newCard = new Card({name, link}, '.element-template');
  return newCard.generateCard();
}
// Добавление стандартных карточек на страницу
initialCards.forEach(function (item){
  const photo = createCard(item.name, item.link);
  photos.append(photo);
});

// Открыть Popup
export function openPopup(popup) {
  popup.classList.add(`popup_opened`);
  document.addEventListener('keydown', closeByEsc);
};

popupProfileOpenButton.addEventListener(`click`, () => {
  openPopup(popupProfile);
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
  profileFormValidation.restartFormValidation();
});

popupAddOpenButton.addEventListener(`click`, () => {
  openPopup(popupNewCard)
  imgNameInput.value = '';
  srcInput.value = '';
  addFormValidation.restartFormValidation();
});


// Закрыть Popup

function closePopup(popup) {
  popup.classList.remove(`popup_opened`)
  document.removeEventListener('keydown', closeByEsc)
};

profileCloseBtn.addEventListener(`click`, () => closePopup(popupProfile));
addCloseBtn.addEventListener(`click`, () => closePopup(popupNewCard));
imgCloseBtn.addEventListener(`click`, () => closePopup(popupBigImg));



// Работа формы
function submitProfileForm (evt) {
    evt.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    closePopup(popupProfile)
}

profileFormElement.addEventListener('submit', submitProfileForm);


// Добавление новых карт:
function submitCardForm (evt) {
  evt.preventDefault();
  const newPhoto = createCard(imgNameInput.value, srcInput.value);
  photos.prepend(newPhoto);
  closePopup(popupNewCard);
  newCardForm.reset()
  const addFormSubmitBtn = newCardForm.querySelector('.popup__button');
  disactivateBtn(addFormSubmitBtn, config);
}

newCardForm.addEventListener(`submit`, submitCardForm);


// закрыть попап по клику на оверлей

popups.forEach(function (currentPopup) {
  currentPopup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(currentPopup);
    };
  });
});

// Закрыть попап Escape'ом

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
