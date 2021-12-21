export default class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open(){
        this._popup.classList.add('popup_isopen');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popup.classList.remove('popup_isopen');
        document.removeEventListener('keydown', this._handleEscClose);
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
        
        this._popup.addEventListener('click', (event) => this._handleOverlayClose(event));
    }
}