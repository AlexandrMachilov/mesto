import '../pages/index.css'

import { 
  profileEditButton,
  popupFormEditContent,
  fieldName,
  fieldStatus,
  elementsContainer,
  contentAddButton,
  popupFormAddContent,
  profileName,
  profileStatus,
  placeName,
  placeUrl
 } from "../scripts/utils/constants.js";

import initialCards from '../scripts/utils/initial-cards.js';
import Card from '../scripts/components/Card.js';
import FormValidator from "../scripts/components/FormValidator.js";
import config from "../scripts/utils/validationConfig.js";
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

const fullSizeImage = new PopupWithImage('.popup_type_show-image');
fullSizeImage.setEventListeners();

function handleCardClick(name, link) {  
  fullSizeImage.open(name, link);
}

function createCard(item) {
  const card = new Card(item, '.element-template', handleCardClick);
  return card.generateCard();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const element = createCard(item);
    cardsList.addItem(element, true);
  }
},
elementsContainer
);

cardsList.renderItems();

const profileUserInfo = new UserInfo('.profile__name', '.profile__status');

const popupEdit = new PopupWithForm('.popup_type_edit', editProfile);
popupEdit.setEventListeners();

function editProfile(itemData) {
  
  const newProfileData = {
    name: itemData.name,
    status: itemData.status
  }
  profileUserInfo.setUserInfo(newProfileData);
  //profileName.textContent = newProfileData.name;
  //profileStatus.textContent = newProfileData.status;
  popupEdit.close();
} 

const formEditContentValitator = new FormValidator(config, popupFormEditContent);
formEditContentValitator.enableValidation(); 

function openEditPopup() {
  const profileUserData = profileUserInfo.getUserInfo();
  fieldName.value = profileUserData.name;
  fieldStatus.value = profileUserData.status;
  formEditContentValitator.setFormState();
  popupEdit.open();
}

profileEditButton.addEventListener('click', () => openEditPopup());   

const popupAdd = new PopupWithForm('.popup_type_add',addCard);   
popupAdd.setEventListeners();

const formAddContentValidator = new FormValidator(config, popupFormAddContent);
formAddContentValidator.enableValidation();

function addCard(itemData) {
  const cardData = { 
    name: itemData.name,
    link: itemData.url 
  };
  const element = createCard(cardData);
  cardsList.addItem(element);
  popupAdd.close();
} 

contentAddButton.addEventListener('click',() => {
  formAddContentValidator.setFormState();
  popupAdd.open()
});