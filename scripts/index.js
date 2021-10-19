const popup = document.querySelector('.popup');//delete
//Edit profile feature
const popupEditProfile = document.querySelector('.popup__content_edit');
const popupCloseButton = document.querySelector('.popup__button_action_close');
const profileEditButton = document.querySelector('.profile__button_action_edit');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const fieldName = document.querySelector('.popup__input_type_name');
const fieldStatus = document.querySelector('.popup__input_type_status');
//Insert default cards feature
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
//Add content feature
const contentAddButton = document.querySelector('.profile__button_action_add');
const popupAddContent = document.querySelector('.popup__content_add');//
const popupFormAddContent = document.querySelector('.popup__form_add-content');
const placeName = document.querySelector('.popup__input_type_place-name');
const placeUrl = document.querySelector('.popup__input_type_place-url');
const addContentButton = document.querySelector('.popup__button_action_add-content');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

initialCards.forEach(appendElement);

function createElement(card){
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = card.link;
    element.querySelector('.element__image').alt = card.name;
    element.querySelector('.element__title').textContent = card.name;
    return element;
}

function appendElement(card){
    const element = createElement(card);
    elements.append(element);
}


/* function openPopup() {
    fieldName.value = profileName.textContent; 
    fieldStatus.value = profileStatus.textContent;
    popup.classList.add('popup_isopen');
} */

function openEditPopup() {
  fieldName.value = profileName.textContent; 
  fieldStatus.value = profileStatus.textContent;
  popupEditProfile.classList.add('popup_isopen');
}
function openAddPopup() {
  popupAddContent.classList.add('popup_isopen');
}
function closePopup() {
    popup.classList.remove('popup_isopen');
} 

function editProfile(event) {
    event.preventDefault();
    profileName.textContent = fieldName.value;
    profileStatus.textContent = fieldStatus.value;
    closePopup();
}

function popupClickHandler(event) {
    if (event.target.classList.contains('popup')) {
      closePopup();
    }
}

profileEditButton.addEventListener('click', openEditPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('mouseup', popupClickHandler);
popupForm.addEventListener('submit', editProfile);
contentAddButton.addEventListener('click', openAddPopup);