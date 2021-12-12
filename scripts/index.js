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
const elementsContainer = '.elements'
//Add content feature
const contentAddButton = document.querySelector('.profile__button_action_add');
const popupAddContent = document.querySelector('.popup_type_add');
const popupFormAddContent = document.querySelector('.popup__form_add-content');
const placeName = document.querySelector('.popup__input_type_place-name');
const placeUrl = document.querySelector('.popup__input_type_place-url');
//Show image feature
const popupShowImage = document.querySelector('.popup_type_show-image');
const popupImage = popupShowImage.querySelector('.popup__image');
const popupCaption = popupShowImage.querySelector('.popup__caption');

import initialCards from './initial-cards.js';
import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import config from "./validationConfig.js";
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-template', handleCardClick);
    const element = card.generateCard();
    cardsList.addItem(element, true);   //изменить метод определения добавления элементов на страницу
  }
},
elementsContainer
);

cardsList.renderItems();
/* function appendElement(item){
  const card = new Card(item, '.element-template', openPopup);
  const element = card.generateCard();
  elements.append(element);
} 
 
function prependElement(item){
  const card = new Card(item, '.element-template', openPopup);
  const element = card.generateCard();
  elements.prepend(element);
}  
*/
function handleCardClick(name, link) {
  const fullSizeImage = new PopupWithImage('.popup_type_show-image');
  fullSizeImage.open(name, link);
  fullSizeImage.setEventListeners();
}

//initialCards.forEach(appendElement);
/*
function openPopup(popupName) {
  popupName.classList.add('popup_isopen');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlay);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_isopen');
  document.removeEventListener('keydown', closeByEsc);
  document.removeEventListener('click', closeByOverlay);
} 

function setCloseButtons(popup) {
  const closeButtonList = [...popup.querySelectorAll('.popup__button_action_close')];
  closeButtonList.forEach((closeButton) => {
    closeButton.addEventListener('click', () => closePopup(popup))
});
}

function popupCloseHandler(popupList){
  popupList.forEach((popup) => setCloseButtons(popup));
};

popupCloseHandler(popupList);

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
*/
const formAddContentValidator = new FormValidator(config, popupFormAddContent);
formAddContentValidator.enableValidation();

const popupAdd = new PopupWithForm('.popup_type_add', addCard);   //Rename popupAdd
popupAdd.setEventListeners();

function addCard() {
  const cardData = { 
    name: placeName.value,
    link: placeUrl.value
  };
  const newCard = new Card(cardData, '.element-template', handleCardClick);
  const element = newCard.generateCard();
  cardsList.addItem(element);
  popupAdd.close();
} 

const formEditContentValitator = new FormValidator(config, popupFormEditContent);
formEditContentValitator.enableValidation(); 

const popupEdit = new PopupWithForm('.popup_type_edit', editProfile);
popupEdit.setEventListeners();

function editProfile() {
  profileName.textContent = fieldName.value;
  profileStatus.textContent = fieldStatus.value;
  popupEdit.close();
}

/* function openEditPopup() {
  fieldName.value = profileName.textContent; 
  fieldStatus.value = profileStatus.textContent;
  formEditContentValitator.setFormState();  //установки состояния кнопки формы при открытии попапа
  openPopup(popupEditProfile);
}   */

/* function editProfile(event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileStatus.textContent = fieldStatus.value;
  closePopup(popupEditProfile);
} */

/* function addElement(event){
  event.preventDefault();
  const card = { 
    name: placeName.value,
    link: placeUrl.value
  }
  prependElement(card);
  closePopup(popupAddContent);
  popupFormAddContent.reset();
} */



/* function openAddPopup() {
  popupFormAddContent.reset();
  formAddContentValidator.setFormState(); //установки состояния кнопки формы при открытии попапа
  openPopup(popupAddContent);
}   */

profileEditButton.addEventListener('click', () => { //добавить внесение данных при открытии
  formEditContentValitator.setFormState();
  popupEdit.open()
});   
//popupFormEditContent.addEventListener('submit', editProfile);
//contentAddButton.addEventListener('click', openAddPopup);
contentAddButton.addEventListener('click',() => {
  formAddContentValidator.setFormState();
  popupAdd.open()
});
//popupFormAddContent.addEventListener('submit', addElement);

//export {openPopup, closePopup, popupShowImage, popupImage, popupCaption};
