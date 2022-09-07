const photos = document.querySelector(`.photos`);
const popupProfileOpenButton = document.querySelector(`.profile__edit-button`);
const popupAddOpenButton = document.querySelector(`.profile__add-button`);
const popupProfile = document.querySelector(`.profile-popup`);
const popupNewCard = document.querySelector(`.add-popup`);
const popupBigImg = document.querySelector(`.img-popup`);
const popupImg = popupBigImg.querySelector(`.img-popup__img`);
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


// Добавить дефолтные карточки на страницу

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
    popupImg.src = eventTarget.src;
    popupImg.alt = eventTarget.alt;
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
  document.addEventListener('keydown', closeByEsc);
}

popupProfileOpenButton.addEventListener(`click`, () => {
  openPopup(popupProfile);
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
});
popupAddOpenButton.addEventListener(`click`, () => openPopup(popupNewCard));


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





  // submitBtn.classList.add(config.inactiveButtonClass);
  // submitBtn.setAttribute('disabled', true);
