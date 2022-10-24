import Card from "./scripts/Card.js";
import { FormValidation } from "./scripts/FormValidation.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";
import { initialCards } from "./scripts/initialCards.js";
import Api from './scripts/Api.js';
import './pages/index.css';
import PopupDeleteCardConfirm from "./scripts/PopupDeleteCardConfirm.js";



const photos = document.querySelector(`.photos`);
const popupProfileOpenButton = document.querySelector(`.profile__edit-button`);
const popupAddOpenButton = document.querySelector(`.profile__add-button`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupNewCard = document.querySelector(`.add-popup`);
const popupBigImg = document.querySelector(`.img-popup`);
const profileFormElement = document.querySelector(`.profile-popup__container`);
const nameInput = profileFormElement.person;
const jobInput = profileFormElement.job;
const nameField = document.querySelector(`.profile__name`);
const jobField = document.querySelector(`.profile__profession`);
const profileAvatar = document.querySelector('.profile__avatar')
const newCardForm = document.querySelector(`.add-popup__container`);
const popupConfirmation = document.querySelector('.confirmation-popup')

const confirmationPopup = new PopupDeleteCardConfirm(popupConfirmation);
confirmationPopup.setEventListeners();
const imgPopup = new PopupWithImage(popupBigImg);
imgPopup.setEventListeners();
const info = new UserInfo({name: nameField, info: jobField, avatar: profileAvatar});
const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: 'b0796f98-3029-411f-8381-49171784b671',
    'Content-Type': 'application/json'
  }
})


// Информация о пользователе
api.getProfileInfo()
.then((result) => {
  info.setUserInfo(result.name, result.about, result.avatar)
})

const profilePopup = new PopupWithForm(popupProfile, (data) => {
  api.editProfileInfo({name: data.person, about: data.job})
  .then((result) => {
    info.setUserInfo(result.name, result.about, result.avatar)
  })
})

popupProfileOpenButton.addEventListener('click', () => {
  profilePopup.open();
  const fields = info.getUserInfo();
  nameInput.value = fields.name;
  jobInput.value = fields.info;
})
profilePopup.setEventListeners();

// Рендер карточек на странице
api.getInitialCards()
.then((data) => {
  console.log(data)
  const defaultCards = new Section({
    items: data,
    renderer: (data) => defaultCards.addItem(getNewCard(data))
    },
    photos
  );
  defaultCards.render();
})

function getNewCard (data) {
  return new Card(data, '.element-template', imgPopup.open.bind(imgPopup), confirmationPopup.open.bind(confirmationPopup), photos)
  .generateCard();
}


// Логика добавления новой карточки

const newCardPopup = new PopupWithForm(popupNewCard, (data) => {
  api.postNewCard({name: data.name, link: data.link})
  .then((result) => {
    photos.prepend(getNewCard(result));
  })

})
popupAddOpenButton.addEventListener('click', () => {
  newCardFormValidation.restartFormValidation();
  newCardPopup.open();
})
newCardPopup.setEventListeners();






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
