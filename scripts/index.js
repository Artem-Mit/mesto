const photos = document.querySelector(`.photos`);
const popupProfileOpenButton = document.querySelector(`.profile__edit-button`);
const popupAddOpenButton = document.querySelector(`.profile__add-button`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupNewCard = document.querySelector(`.add-popup`);
const popupBigImg = document.querySelector(`.img-popup`);
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


const createCard = function (name, link) {
  const elementTemplate = document.querySelector(`.element-template`).content;
  const photoElement = elementTemplate.querySelector(`.element`).cloneNode(true);
  const photoElementImg = photoElement.querySelector(`.element__img`);
  const photoElementTitle = photoElement.querySelector(`.element__title`);
  photoElementImg.src = link;
  photoElementImg.alt = name;
  photoElementTitle.textContent = name;


  // Лайк
  const likeBtn = photoElement.querySelector(`.element__like-btn`);
  likeBtn.addEventListener(`click`, function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle(`element__like-btn_active`);
  });


  // Удаление карточки
  const deleteBtn = photoElement.querySelector(`.element__delete-btn`);
  deleteBtn.addEventListener(`click`, function(evt){
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
  });

  // Просмотр картинки
  const img = photoElement.querySelector(`.element__img`);
  img.addEventListener(`click`, function (evt) {
    const eventTarget = evt.target;
    console.log(eventTarget);
    openPopup(popupBigImg);
    popupBigImg.querySelector(`.img-popup__img`).src = eventTarget.src;
    popupBigImg.querySelector(`.img-popup__img`).alt = eventTarget.alt;
    popupBigImg.querySelector(`.img-popup__caption`).textContent = eventTarget.alt;
  });

  return photoElement;
};


initialCards.forEach(function (item){
  const photo = createCard(item.name, item.link);
  photos.append(photo);
});

// Открыть Popup
function openPopup(popup) {
  popup.classList.add(`popup_opened`);
};

popupProfileOpenButton.addEventListener(`click`, () => {
  openPopup(popupProfile);
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
});
popupAddOpenButton.addEventListener(`click`, () => openPopup(popupNewCard));


// Закрыть Popup

function closePopup(popup) {
  popup.classList.remove(`popup_opened`)
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
function createNewCard (evt) {
  evt.preventDefault();
  const newPhoto = createCard(imgNameInput.value, srcInput.value);
  photos.prepend(newPhoto);
  closePopup(popupNewCard);
  newCardForm.reset()
}
newCardForm.addEventListener(`submit`, createNewCard);

