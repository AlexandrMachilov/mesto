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
 } from "./utils/constants.js";

import initialCards from './utils/initial-cards.js';
import Card from './components/Card.js';
import FormValidator from "./components/FormValidator.js";
import config from "./utils/validationConfig.js";
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

function handleCardClick(name, link) {
  const fullSizeImage = new PopupWithImage('.popup_type_show-image');
  fullSizeImage.open(name, link);
  fullSizeImage.setEventListeners();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.element-template', handleCardClick);
    const element = card.generateCard();
    cardsList.addItem(element, true);
  }
},
elementsContainer
);

cardsList.renderItems();

const ProfileUserInfo = new UserInfo('.profile__name', '.profile__status');

const PopupEdit = new PopupWithForm('.popup_type_edit', editProfile);
PopupEdit.setEventListeners();

function editProfile(itemData) {
  
  const newProfileData = {
    name: itemData.name,
    status: itemData.status
  }
  ProfileUserInfo.setUserInfo(newProfileData);
  profileName.textContent = newProfileData.name;
  profileStatus.textContent = newProfileData.status;
  PopupEdit.close();
} 

const formEditContentValitator = new FormValidator(config, popupFormEditContent);
formEditContentValitator.enableValidation(); 

function openEditPopup() {
  const profileUserData = ProfileUserInfo.getUserInfo();
  fieldName.value = profileUserData.name;
  fieldStatus.value = profileUserData.status;
  formEditContentValitator.setFormState();
  PopupEdit.open();
}

profileEditButton.addEventListener('click', () => openEditPopup());   

const PopupAdd = new PopupWithForm('.popup_type_add',addCard);   
PopupAdd.setEventListeners();

const formAddContentValidator = new FormValidator(config, popupFormAddContent);
formAddContentValidator.enableValidation();

function addCard(itemData) {
  const cardData = { 
    name: itemData.name,
    link: itemData.url 
  };
  const newCard = new Card(cardData, '.element-template', handleCardClick);
  const element = newCard.generateCard();
  cardsList.addItem(element);
  PopupAdd.close();
} 

contentAddButton.addEventListener('click',() => {
  formAddContentValidator.setFormState();
  PopupAdd.open()
});