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
  /* const formsList = [...document.querySelectorAll(this._config.formSelector)];
  formsList.forEach(form => this._setFormListeners(form)); */
  document.querySelector(this._config.formSelector);
  this._setFormListeners(this._form);
  }

  _setFormListeners() { //(form)
    /* form.addEventListener('submit', (event) => event.preventDefault());
    const inputsList =[...form.querySelectorAll(this._config.inputSelector)];
    inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._handlerFieldValidation(inputElement, form);
        this._setSubmitButtonState(form);
    });  
    });
    this._setSubmitButtonState(form); */
    this._form.addEventListener('submit', (event) => event.preventDefault());
    const inputsList =[...this._form.querySelectorAll(this._config.inputSelector)];
    inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._handlerFieldValidation(inputElement);
        this._setSubmitButtonState();
    });  
    });
    this._setSubmitButtonState();
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
    inputsList.forEach((input) => this._hideError(input, form));
  }

  /* _checkPopupState(popup) {
    const form = popup.querySelector(this._config.formSelector);
    this._setSubmitButtonState();
    this._hideInputErrors();
  }  */

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
/* 
 function enableValidation(validationConfig) {
  const formsList = [...document.querySelectorAll(validationConfig.formSelector)];
  formsList.forEach(form => setFormListeners(form, validationConfig));
} 

function setFormListeners(form, config) {
  form.addEventListener('submit', (event) => event.preventDefault());
  const inputsList =[...form.querySelectorAll(config.inputSelector)];
  inputsList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      handlerFieldValidation(inputElement, form, config);
      setSubmitButtonState(form, config);
  });  
  });
  setSubmitButtonState(form, config);
}

function handlerFieldValidation(input, form, config) {
  if (!input.validity.valid) {
    showError(input, form, config);
  } else {
    hideError(input, form, config);
  }
}

function showError(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-input-error`); 
  input.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass); 
  errorElement.textContent = input.validationMessage;
}

function hideError(input, form, config) {
  const errorElement = form.querySelector(`.${input.id}-input-error`); 
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

function hideInputErrors(form, config) {
  const inputsList =[...form.querySelectorAll(config.inputSelector)];
  inputsList.forEach((input) => hideError(input, form, config));
}

function showInputErrors(form, config) {
  const inputsList =[...form.querySelectorAll(config.inputSelector)];
  inputsList.forEach((input) => showError(input, form, config));
}

function checkPopupState(popup, config) {
  const form = popup.querySelector(config.formSelector);
  setSubmitButtonState(form, config);
  hideInputErrors(form, config);
}

function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);
    if (hasInvalidInput(form)) {
      button.disabled
      button.classList.add(config.inactiveButtonClass);
    } else {
      button.classList.remove(config.inactiveButtonClass);
    }
}

function hasInvalidInput(form) {
  const inputsList =[...form.querySelectorAll(config.inputSelector)];
  return inputsList.some((inputElement) => {
    return  !inputElement.validity.valid;
  })
}

enableValidation(config);
 */