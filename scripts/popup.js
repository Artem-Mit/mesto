// Добавить дефолтные карточки на страницу
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


const addCard = function (name, link) {
  const elementTemplate = document.querySelector(`.element-template`).content;
  const photoElement = elementTemplate.querySelector(`.element`).cloneNode(true);
  photoElement.querySelector(`.element__img`).src = link;
  photoElement.querySelector(`.element__img`).alt = `Фото ${name}`;
  photoElement.querySelector(`.element__title`).textContent = name;


  // Кнопка лайка
  const likeBtn = photoElement.querySelector(`.element__like-btn`)
  likeBtn.addEventListener(`click`, function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle(`element__like-btn_active`);
  });

  return photoElement;
};

const photos = document.querySelector(`.photos`);

initialCards.forEach(function (item){
  const photo = addCard(item.name, item.link);
  photos.append(photo);
});

// Открыть Popup
const editBtn = document.querySelector(`.profile__edit-button`);
const addBtn = document.querySelector(`.profile__add-button`);
const profilePopup = document.querySelector(`.profile-popup`);
const addPopup = document.querySelector(`.add-popup`);

function opener(popup) {
  popup.classList.add(`popup_opened`);
  if (popup == profilePopup) {
    nameInput.value = nameField.textContent;
    jobInput.value = jobField.textContent;
  }
};
editBtn.addEventListener(`click`, () => opener(profilePopup));
addBtn.addEventListener(`click`, () => opener(addPopup));


// Закрыть Popup
const profileCloseBtn = document.querySelector(`.profile-popup__close`);
const addCloseBtn = document.querySelector(`.add-popup__close`);
function closer(popup) {
  popup.classList.remove(`popup_opened`)
};
profileCloseBtn.addEventListener(`click`, () => closer(profilePopup));
addCloseBtn.addEventListener(`click`, () => closer(addPopup));


// Работа формы

let formElement = document.querySelector(`.profile-popup__container`);
let nameInput = formElement.name;
let jobInput = formElement.job;
let nameField = document.querySelector(`.profile__name`);
let jobField = document.querySelector(`.profile__profession`);
function formSubmitHandler (evt) {
    evt.preventDefault();
    nameField.textContent = nameInput.value;
    jobField.textContent = jobInput.value;
    closer(profilePopup)
}

formElement.addEventListener('submit', formSubmitHandler);


// Добавление новых карт:
const addSbmt = document.querySelector(`.add-popup__submit`);
const addForm = document.querySelector(`.add-popup__container`);
const imgNameInput = addForm.img;
const srcInput = addForm.source;

function newCard (evt) {
  evt.preventDefault();
  const newPhoto = addCard(imgNameInput.value, srcInput.value);
  photos.prepend(newPhoto);
  closer(addPopup);
}
addForm.addEventListener(`submit`, newCard);

