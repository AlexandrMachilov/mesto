import '../pages/index.css'

import { 
  profileEditButton,
  popupFormEditContent,
  fieldName,
  fieldStatus,
  elementsContainer,
  contentAddButton,
  popupFormAddContent,
  avatarEditButton,
  popupFormEditAvatar
 } from "../scripts/utils/constants.js";

import Card from '../scripts/components/Card.js';
import FormValidator from "../scripts/components/FormValidator.js";
import config from "../scripts/utils/validationConfig.js";
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';

const api = new Api({
  adress: 'https://mesto.nomoreparties.co',
  cohortID: 'cohort-32',
  token: '6d2de758-1877-4081-94a9-68820dbef110'
})
let userId;
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    profileUserInfo.setUserAvatar(userData)
    profileUserInfo.setUserInfo(userData);
    userId = profileUserInfo.getUserId(userData);

    cardsList.renderItems(cards);
  })
  .catch(err => {
    console.log('Ошибка', err);
  })


const fullSizeImage = new PopupWithImage('.popup_type_show-image');
fullSizeImage.setEventListeners();

function handleCardClick(name, link) {  
  fullSizeImage.open(name, link);
}

const popupConfirmDelete = new PopupWithConfirm('.popup_type_confirm', {
  formSubmitHandler: () => {}
})

popupConfirmDelete.setEventListeners();

function createCard(item) {
  const card = new Card(item, '.element-template', handleCardClick, {
    handleDeleteButtonCLick: () => {
      popupConfirmDelete.open();
      
      popupConfirmDelete.setSubmitAction(() => {
        api.deleteCard(card)
          .then(() => {
            card.deleteCard();
          })
          .catch(err => {
            console.log('Ошибка', err);
          })
        popupConfirmDelete.close();
      })
    }
  },
  {
    handleLikeButtonClick: () => {
      if (!card.isLiked()) {
        api.likeCard(card)
          .then((res) => {            
            card.likeButtonSwitch()
            card.setLikesNumber(res);
            card.updateLikesNumber(res);
          })
          .catch(err => {
            console.log('Ошибка', err);
          })
      } else {
        api.deleteLike(card)
        .then((res) => {
          card.likeButtonSwitch();
          card.setLikesNumber(res);
          card.updateLikesNumber(res);
        })
        .catch(err => {
          console.log('Ошибка', err);
        })
      }
    }
  }, userId);
  return card.generateCard();
}

const cardsList = new Section({
  renderer: (item) => {
    const element = createCard(item);
    cardsList.addItem(element, true);
  }
},
elementsContainer
);

const profileUserInfo = new UserInfo('.profile__name', '.profile__status', '.profile__avatar');

const popupEdit = new PopupWithForm('.popup_type_edit', editProfile);
popupEdit.setEventListeners();

function editProfile(itemData) {
  
  const newProfileData = {
    name: itemData.name,
    about: itemData.status
  }
  popupEdit.renderLoading(true);
  api.editProfileData(newProfileData)
  .then(res => profileUserInfo.setUserInfo(res))
  .catch(err => {
    console.log('Ошибка', err);
  })
  .finally(() => {
    popupEdit.renderLoading(false);
 }) 
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
  popupAdd.renderLoading(true);
  api.createCard(cardData)
  .then(res => {
    const element = createCard(res);
    cardsList.addItem(element);
  })
  .finally(() => {
    popupAdd.renderLoading(false);
 }) 
  popupAdd.close();
} 

contentAddButton.addEventListener('click',() => {
  formAddContentValidator.setFormState();
  popupAdd.open()
});

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', editAvatar);
popupEditAvatar.setEventListeners();

function editAvatar(data) {
  popupEditAvatar.renderLoading(true)
  api.editAvatar(data)
    .then(res => {
      profileUserInfo.setUserAvatar(res);
      popupEditAvatar.close();
    })
    .catch(err => {
      console.log('Ошибка', err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
   })
}
const formEditAvatarValitator = new FormValidator(config, popupFormEditAvatar);
formEditAvatarValitator.enableValidation(); 

avatarEditButton.addEventListener('click',() => {
  formEditAvatarValitator.setFormState();
  popupEditAvatar.open()
});
