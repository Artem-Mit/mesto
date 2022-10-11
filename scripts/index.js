import Card from "./Card.js";
import { FormValidation } from "./FormValidation.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";


const photos = document.querySelector(`.photos`);
const popupProfileOpenButton = document.querySelector(`.profile__edit-button`);
const popupAddOpenButton = document.querySelector(`.profile__add-button`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupNewCard = document.querySelector(`.add-popup`);
const popupBigImg = document.querySelector(`.img-popup`);
const profileFormElement = document.querySelector(`.profile-popup__container`);
const nameInput = profileFormElement.name;
const jobInput = profileFormElement.job;
const nameField = document.querySelector(`.profile__name`);
const jobField = document.querySelector(`.profile__profession`);
const newCardForm = document.querySelector(`.add-popup__container`);

const imgPopup = new PopupWithImage(popupBigImg);

const newCardPopup = new PopupWithForm(popupNewCard, (data) => {
  const card = new Card(data, '.element-template', imgPopup.open.bind(imgPopup));
  const newCard = card.generateCard();
  photos.prepend(newCard);
})
popupAddOpenButton.addEventListener('click', () => {
  newCardFormValidation.restartFormValidation();
  newCardPopup.open();
  newCardPopup.setEventListeners();
})

const profilePopup = new PopupWithForm(popupProfile, (data) => {
  const info = new UserInfo({name: nameField, info: jobField});
  info.setUserInfo(data.name, data.link);
})
popupProfileOpenButton.addEventListener('click', () => {
  profilePopup.open();
  const info = new UserInfo({name: nameField, info: jobField});
  const fields = info.getUserInfo();
  nameInput.value = fields.name;
  jobInput.value = fields.info;
  profilePopup.setEventListeners();
})

const defaultCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-template', imgPopup.open.bind(imgPopup));
    const newCard = card.generateCard();
    defaultCards.addItem(newCard);
  }},
  photos
);
defaultCards.render();

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const newCardFormValidation = new FormValidation(newCardForm, config);
newCardFormValidation.enableFormValidation();
const profileFormValidation = new FormValidation(profileFormElement, config);
profileFormValidation.enableFormValidation();
