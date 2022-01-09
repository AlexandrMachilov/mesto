import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, {formSubmitHandler}){
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._formSubmitHandler = formSubmitHandler;
    }

    setSubmitAction(action){
        this._formSubmitHandler = action;
    }

    setEventListeners(){
    
        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._formSubmitHandler();
        }); 
        super.setEventListeners();
    }
}