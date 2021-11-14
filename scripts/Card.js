const popupShowImage = document.querySelector('.popup_type_show-image');
const popupImage = popupShowImage.querySelector('.popup__image');
const popupCaption = popupShowImage.querySelector('.popup__caption');

class Card {
  
    constructor(data, cardSelector) {
      this._link = data.link;
      this._name = data.name;
      this._cardSelector = cardSelector;
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
      const elementButtonLike = this._element.querySelector('.element__button_action_like');
      elementButtonLike.addEventListener('click', this._likeClickHandler);
  
      const elementButtonDelete = this._element.querySelector('.element__button_action_delete');
      elementButtonDelete.addEventListener('click', this._deleteClickHandler);
      
      const elementImage = this._element.querySelector('.element__image');
      elementImage.addEventListener('click', () => this._showImage());
    }
  
    _likeClickHandler(event) {
      event.target.classList.toggle('element__button_action_like_active');
    }
  
    _deleteClickHandler(event) {
      event.target.closest('.element').remove(); 
    }
  
    _showImage() {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.textContent = this._name;
      openPopup(popupShowImage);
    }
}

/* function openPopup(popupName) {
  popupName.classList.add('popup_isopen');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlay);
}
function closePopup(popupName) {
  popupName.classList.remove('popup_isopen');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByOverlay);
} 

 function closeByEsc(event) {
  const openedPopup = document.querySelector('.popup_isopen');
   if (event.key === 'Escape') {
    closePopup(openedPopup);
  } 
} 

function closeByOverlay(event) {
  const openedPopup = document.querySelector('.popup_isopen');
  if (event.target.classList.contains('popup')) {
    closePopup(openedPopup);
  }
} */
import {openPopup, closePopup} from './index.js';
export {Card};