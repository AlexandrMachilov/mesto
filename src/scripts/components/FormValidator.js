class FormValidator {

  constructor(validationConfig, form) {
    this._config = validationConfig;
    this._form = form;
    this._inputsList =[...this._form.querySelectorAll(this._config.inputSelector)];
    this._button = this._form.querySelector(this._config.submitButtonSelector);
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
    this._inputsList.forEach((input) => this._hideError(input));
  }

  _handlerFieldValidation(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  } 

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return  !inputElement.validity.valid;
    })
  }

  _setSubmitButtonState() {
    
    if (this._hasInvalidInput()) {
      this._button.disabled = true;
      this._button.classList.add(this._config.inactiveButtonClass);
    } else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _setFormListeners() { 
    this._form.addEventListener('submit', (event) => event.preventDefault());
    this._inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._handlerFieldValidation(inputElement);
        this._setSubmitButtonState();
    });  
    });
    this._setSubmitButtonState();
  } 

  setFormState() {              //публичный метод для установки состояния кнопки
    this._setSubmitButtonState(); 
    this._hideInputErrors();
  }  

  enableValidation() {
    this._setFormListeners(this._form);
  }
}

export default FormValidator;