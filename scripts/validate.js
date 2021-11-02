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
  form.addEventListener('submit', handlerSubmit);
  form.addEventListener('input', () => setSubmitButtonState(form, config));
  const inputsList =[...form.querySelectorAll(config.inputSelector)];
  inputsList.forEach(inputElement => {
    inputElement.addEventListener('input',
    () => handlerFieldValidation(inputElement, form, config));  
  });
  setSubmitButtonState(form, config);
}

function handlerSubmit(event) {
  event.preventDefault();
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

function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

enableValidation(config);