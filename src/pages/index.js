import Card from "../components/Card.js";
import { FormValidation } from "../components/FormValidation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";
import PopupDeleteCardConfirm from "../components/PopupDeleteCardConfirm.js";

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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
const profileAvatar = document.querySelector(".profile__avatar");
const newCardForm = document.querySelector(`.add-popup__container`);
const popupConfirmation = document.querySelector(".confirmation-popup");
const avatarImage = document.querySelector(".profile__avatar");
const popupEditAvatar = document.querySelector(".avatar-popup");
const avatarFormElement = document.querySelector(".avatar-popup__container");


const newCardFormValidation = new FormValidation(newCardForm, config);
newCardFormValidation.enableFormValidation();
const profileFormValidation = new FormValidation(profileFormElement, config);
profileFormValidation.enableFormValidation();
const avatarEditFormValidation = new FormValidation(avatarFormElement, config);
avatarEditFormValidation.enableFormValidation();

const confirmationPopup = new PopupDeleteCardConfirm(
  popupConfirmation,
  ({ id, func }) => {
    api
      .deleteCard(id)
      .then(() => {
        func();
      })
      .then(() => {
        confirmationPopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
confirmationPopup.setEventListeners();
const imgPopup = new PopupWithImage(popupBigImg);
imgPopup.setEventListeners();
const defaultCards = new Section(
  {
    renderer: (data, myId) => defaultCards.addItem(getNewCard(data, myId)),
  },
  photos
);
const info = new UserInfo({
  name: nameField,
  info: jobField,
  avatar: profileAvatar,
});
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: "b0796f98-3029-411f-8381-49171784b671",
    "Content-Type": "application/json",
  },
});

const profilePopup = new PopupWithForm(popupProfile, (data) => {
  api
    .editProfileInfo({ name: data.person, about: data.job })
    .then((result) => {
      info.setUserInfo(result.name, result.about, result.avatar);
    })
    .then(() => profilePopup.close())
    .catch((err) => console.log(err.message))
    .finally(() => profilePopup.renderLoading(false));
});

const avatarPopup = new PopupWithForm(popupEditAvatar, (data) => {
  api
    .setAvatar({ avatar: data.avatarLinkInput })
    .then((result) =>
      info.setUserInfo(result.name, result.about, result.avatar)
    )
    .then(() => avatarPopup.close())
    .catch((err) => console.log(err.message))
    .finally(() => avatarPopup.renderLoading(false));
});

avatarImage.addEventListener("click", () => {
  avatarFormElement.reset();
  avatarEditFormValidation.restartFormValidation();
  avatarPopup.open();
});
avatarPopup.setEventListeners();

popupProfileOpenButton.addEventListener("click", () => {
  profilePopup.open();
  const fields = info.getUserInfo();
  nameInput.value = fields.name;
  jobInput.value = fields.info;
  profileFormValidation.restartFormValidation()
});
profilePopup.setEventListeners();

function getNewCard(data, myId) {
  const newCard = new Card(
    data,
    ".element-template",
    imgPopup.open.bind(imgPopup),
    () => {
      confirmationPopup.open({
        id: data._id,
        func: () => newCard.removeCard(),
      });
    },
    (likedByMyself) => {
      if (!likedByMyself) {
        api
          .setLike(data._id)
          .then((res) => {
            newCard.addLike(res.likes.length);
          })
          .catch((err) => console.log(err.message));
      } else {
        api
          .removeLike(data._id)
          .then((res) => {
            newCard.deleteLike(res.likes.length);
          })
          .catch((err) => console.log(err.message));
      }
    },
    myId,
    photos
  );
  return newCard.generateCard();
}

// Логика добавления новой карточки

const newCardPopup = new PopupWithForm(popupNewCard, (data) => {
  api
    .postNewCard({ name: data.name, link: data.link })
    .then((result) => {
      defaultCards.addItem(getNewCard(result, result.owner._id), true);
    })
    .then(() => newCardPopup.close())
    .catch((err) => console.log(err.message))
    .finally(() => newCardPopup.renderLoading(false));
});
popupAddOpenButton.addEventListener("click", () => {
  newCardFormValidation.restartFormValidation();
  newCardPopup.open();

});
newCardPopup.setEventListeners();



Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileData, initialCards]) => {
    const myId = profileData._id;
    info.setUserInfo(profileData.name, profileData.about, profileData.avatar);
    defaultCards.renderItems(initialCards, myId);
  })
  .catch((err) => console.log(err.message));
