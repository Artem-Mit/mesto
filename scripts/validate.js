enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// Функция добавления текста ошибок в спан (если хотя-бы один инпут "инвалид :D ")
function validateInput(formElement, input, config) {
  const error = formElement.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    input.classList.add(config.inputErrorClass);
    error.classList.add(config.errorClass);
    error.textContent = input.validationMessage;
  } else {
    input.classList.remove(config.inputErrorClass);
    error.classList.remove(config.errorClass);
    error.textContent = '';
  }
}

// Функция добавления слушателей на инпуты
function addHandlers(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(formElement, input, config)
      deactiveButton(inputs, button, config)
    })
  })
}

// Функция выключения кнопки сабмит
function deactiveButton(inputs, button, config) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', true)
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled', true)
  }
}

// Функция проверки массива инпутов на хотя бы один невалидный инпут
function hasInvalidInput(inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};


// Включение включения валидации при передаче в нее объекта с настройками
function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.formSelector));
  form.forEach(function (formElement){
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    addHandlers(formElement, config);
  });
}

