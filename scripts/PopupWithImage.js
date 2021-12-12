import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
    }

    open(name, link){
        this._name = name;
        this._link = link;
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._popupCaption.textContent = this._name;
        super.open();
    }
    
}