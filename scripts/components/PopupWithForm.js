import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmitHandler){
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupButton = this._popup.querySelector('.popup__button');
        this._inputsList = [...this._popup.querySelectorAll('.popup__input')];

    }

    _getInputValues(){
        this._inputsValues = {};
        this._inputsList.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        });
        return this._inputsValues;
    }

    setEventListeners(){
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._formSubmitHandler(this._getInputValues())
        });
        super.setEventListeners();
    }

    close(){
        this._popupForm.reset();
        super.close();
    }
}