const popupList = [...document.querySelectorAll('.popup')];
//Edit profile feature
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__button_action_edit');
const popupFormEditContent = document.querySelector('.popup__form_edit-content');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const fieldName = document.querySelector('.popup__input_type_name');
const fieldStatus = document.querySelector('.popup__input_type_status');
//Insert default cards feature
const elements = document.querySelector('.elements');
//Add content feature
const contentAddButton = document.querySelector('.profile__button_action_add');
const popupAddContent = document.querySelector('.popup_type_add');
const popupFormAddContent = document.querySelector('.popup__form_add-content');
const placeName = document.querySelector('.popup__input_type_place-name');
const placeUrl = document.querySelector('.popup__input_type_place-url');

import {initialCards} from './initial-cards.js';
import {Card} from './Card.js';
import {FormValidator, config} from "./FormValidator.js";

function appendElement(item){
  const card = new Card(item, '.element-template');
  const element = card.generateCard();
  elements.append(element);
} 

function prependElement(item){
  const card = new Card(item, '.element-template');
  const element = card.generateCard();
  elements.prepend(element);
}  

initialCards.forEach(appendElement);

function openPopup(popupName) {
  popupName.classList.add('popup_isopen');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlay);
}

function openEditPopup() {
  fieldName.value = profileName.textContent; 
  fieldStatus.value = profileStatus.textContent;
  new FormValidator(config, popupFormEditContent).enableValidation(); 
  openPopup(popupEditProfile);
}  

function editProfile(event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileStatus.textContent = fieldStatus.value;
  closePopup(popupEditProfile);
}

function addElement(event){
  event.preventDefault();
  const card = { 
    name: placeName.value,
    link: placeUrl.value
  }
  prependElement(card);
  closePopup(popupAddContent);
  popupFormAddContent.reset();

}

function openAddPopup() {
  popupFormAddContent.reset();
  new FormValidator(config, popupFormAddContent).enableValidation(); 
  openPopup(popupAddContent);
}  

profileEditButton.addEventListener('click', openEditPopup);
popupFormEditContent.addEventListener('submit', editProfile);
contentAddButton.addEventListener('click', openAddPopup);
popupFormAddContent.addEventListener('submit', addElement);

function popupCloseHandler(popupList){
  popupList.forEach((popup) => setCloseButtons(popup));
};

popupCloseHandler(popupList);

function setCloseButtons(popup) {
  const closeButtonList = [...popup.querySelectorAll('.popup__button_action_close')];
  closeButtonList.forEach((closeButton) => {
    closeButton.addEventListener('click', () => closePopup(popup))
});
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
}

export {openPopup, closePopup};

window.addEventListener('load', ()=>{
  document.querySelectorAll('.popup').forEach((popup) => popup.classList.add('popup_transition'))
})

