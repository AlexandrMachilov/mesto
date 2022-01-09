export default class Card {
  
    constructor(data, cardSelector, handleCardClick, {handleDeleteButtonCLick}, {handleLikeButtonClick}, userId) {
      this._data = data;
      this._link = data.link;
      this._name = data.name;
      this._id = data._id;
      this._likes = data.likes;
      this._ownerId = data.owner._id;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleDeleteButtonCLick = handleDeleteButtonCLick;
      this._handleLikeButtonClick = handleLikeButtonClick;
      this._userId = userId.id;
    
    }
  
    _getTemplate() {
      const element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return element;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      const elementImage = this._element.querySelector('.element__image'); 
      elementImage.src = this._link;
      elementImage.alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
      this._removeDeleteButton();
      this.setLikesNumber(this._data);
      this.setLikeButtonState();
      return this._element;
    }
  
    _setEventListeners() {
      //this._element.querySelector('.element__button_action_like').addEventListener('click', () => this._likeClickHandler());
      this._element.querySelector('.element__button_action_like').addEventListener('click', () => this._handleLikeButtonClick(this._likes));
      //this._element.querySelector('.element__button_action_delete').addEventListener('click', () => this._deleteClickHandler());
      this._element.querySelector('.element__button_action_delete').addEventListener('click', () => this._handleDeleteButtonCLick());
      this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }
  
    likeButtonSwitch() {
      this._element.querySelector('.element__button_action_like').classList.toggle('element__button_action_like_active');
    }
    
    _removeDeleteButton() {
      if (this._userId != this._ownerId) {
        this._element.querySelector('.element__button_action_delete').remove();
      } 
    }
    /* _deleteClickHandler() {
      this._element.closest('.element').remove(); 
      this._element = null;
    } */
    deleteCard(){
      this._element.closest('.element').remove(); 
      this._element = null;
    }

    setLikesNumber(data){
      if (data.likes.length === 0) {
        this._element.querySelector('.element__likes-number').textContent = '';
      } else {
        //this._element.querySelector('.element__likes-number').textContent = this._likes.length;
      this._element.querySelector('.element__likes-number').textContent = data.likes.length;
      }
    }

    updateLikesNumber(data){
      this._likes = data.likes
    }
   /*  changeLikesNumber(data) {
      if (this._likes.length === 0) {
        this._element.querySelector('.element__likes-number').textContent = '';
      } else {
        this._element.querySelector('.element__likes-number').textContent = data.likes.length;
      }
    } */
    setLikeButtonState(){
      if (this.isLiked()) {
        this._element.querySelector('.element__button_action_like').classList.add('element__button_action_like_active');
      } else {
        this._element.querySelector('.element__button_action_like').classList.remove('element__button_action_like_active');
      }
    }

    isLiked(){
      return this._likes.some(like => like['_id'] === this._userId);
    }
}
