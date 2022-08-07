// Открытие Popup
let profileEditButton = document.querySelector(`.profile__edit-button`);
let popup = document.querySelector(`.popup`)
function popupOpener() {
  popup.classList.add(`popup_opened`);
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
let nameInput = document.querySelector(`.popup__name-input`);
let jobInput = document.querySelector(`.popup__profession-input`);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let nameText = nameInput.value;
    let jobText = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameField = document.querySelector(`.profile__name`);
    let jobField = document.querySelector(`.profile__profession`);
    // Вставьте новые значения с помощью textContent
    nameField.textContent = nameText;
    jobField.textContent = jobText;
    popupCloser()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

