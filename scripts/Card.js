export default class Card {
  
    constructor(data, cardSelector, handleCardClick) {
      this._link = data.link;
      this._name = data.name;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    
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
      this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }
  
    _likeClickHandler() {
      this._element.querySelector('.element__button_action_like').classList.toggle('element__button_action_like_active');
    }
  
    _deleteClickHandler() {
      this._element.closest('.element').remove(); 
      this._element = null;
    }
}
