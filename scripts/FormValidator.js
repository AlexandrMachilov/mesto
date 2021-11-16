const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

class FormValidator {

  constructor(validationConfig, form) {
    this._config = validationConfig;
    this._form = form;
  }
  
  enableValidation() {
    document.querySelector(this._config.formSelector);
    this._setFormListeners(this._form);
  }

  _setFormListeners() { 
    this._form.addEventListener('submit', (event) => event.preventDefault());
    const inputsList =[...this._form.querySelectorAll(this._config.inputSelector)];
    inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._handlerFieldValidation(inputElement);
        this._setSubmitButtonState();
    });  
    });
    this._checkFormState();
  } 

  _handlerFieldValidation(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  } 

  _showError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-input-error`); 
    input.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass); 
    errorElement.textContent = input.validationMessage;
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-input-error`); 
    input.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _hideInputErrors() {
    const inputsList =[...this._form.querySelectorAll(this._config.inputSelector)];
    inputsList.forEach((input) => this._hideError(input));
  }

  _checkFormState() {
    this._setSubmitButtonState();
    this._hideInputErrors();
  }  

  _setSubmitButtonState() {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    if (this._hasInvalidInput()) {
      button.disabled
      button.classList.add(this._config.inactiveButtonClass);
    } else {
      button.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _hasInvalidInput() {
    const inputsList =[...this._form.querySelectorAll(this._config.inputSelector)];
    return inputsList.some((inputElement) => {
      return  !inputElement.validity.valid;
    })
  }
}

export {FormValidator, config};