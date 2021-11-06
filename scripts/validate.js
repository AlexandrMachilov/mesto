const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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