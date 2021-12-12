export default class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }

    open(){
        this._popup.classList.add('popup_isopen');
    }

    close(){
        this._popup.classList.remove('popup_isopen');
    }

    _handleEscClose(event){
        if (event.key === 'Escape') {
            this.close();
          } 
    }

    _handleOverlayClose(event){
        if (event.target.classList.contains('popup')) {
            this.close();
          }
    }

    setEventListeners(){
        this._popup.querySelector('.popup__button_action_close').addEventListener('click', () => this.close());
        document.addEventListener('keydown', (event) => this._handleEscClose(event));
        this._popup.addEventListener('click', (event) => this._handleOverlayClose(event));
    }
}