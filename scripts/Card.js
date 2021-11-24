import {openPopup,popupShowImage, popupImage, popupCaption} from './index.js';

class Card {
  
    constructor(data, cardSelector, openPopup) {
      this._link = data.link;
      this._name = data.name;
      this._cardSelector = cardSelector;
      this._openPopup = openPopup;
    }
  
    _getTemplate() {
      const element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return element;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__image').alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
      return this._element;
    }
  
    _setEventListeners() {

      this._element.querySelector('.element__button_action_like').addEventListener('click', () => this._likeClickHandler());
  
      this._element.querySelector('.element__button_action_delete').addEventListener('click', () => this._deleteClickHandler());
      
      this._element.querySelector('.element__image').addEventListener('click', () => this._showImage());
    }
  
    _likeClickHandler() {
      this._element.querySelector('.element__button_action_like').classList.toggle('element__button_action_like_active');
    }
  
    _deleteClickHandler() {
      this._element.closest('.element').remove(); 
      this._element = null;
    }
  
    _showImage() {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.textContent = this._name;
      this._openPopup(popupShowImage);
    }
}

export default Card;