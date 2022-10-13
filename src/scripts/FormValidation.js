export class FormValidation {
  constructor (form, config) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  };
// Проверка валидации инпутов
  _hasInvalidInput() {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
// Добавление ошибок инпутов
  _validateInput(input) {
    this._error = this._form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(input)
    } else {
      this._hideInputError(input)
    }
  };
  _showInputError(input) {
    input.classList.add(this._inputErrorClass);
    this._error.classList.add(this._errorClass);
    this._error.textContent = input.validationMessage;
  };
  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    this._error.classList.remove(this._errorClass);
    this._error.textContent = '';
  };
// Функция выключения кнопки сабмит
  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.setAttribute('disabled', true)
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.removeAttribute('disabled')
    }
  };
// Добавление слушателей на ввод в инпуты
  _addHandlers() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input)
        this._toggleSubmitButton()
      });
    });
  };
// Включение валидации
  enableFormValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._addHandlers();
  };
// Рестарт валидации (при закрытии\открытии формы)
  restartFormValidation() {
    this._inputs.forEach((input) => {
      if (input.validity.valid) {
      this._hideInputError(input);
      }
      this._toggleSubmitButton();
    }
    )};

}
