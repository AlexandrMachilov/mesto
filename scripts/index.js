const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__button_action_close');
const profileEditButton = document.querySelector('.profile__button_action_edit');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const fieldName = document.querySelector('.popup__input_type_name');
const fieldStatus = document.querySelector('.popup__input_type_status');
const contentAddButton = document.querySelector('.profile__button_action_add');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;

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

initialCards.forEach(fillContent);

function fillContent(card){
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = card.link;
    element.querySelector('.element__image').alt = card.name;
    element.querySelector('.element__title').textContent = card.name;
    elements.append(element);
}


function openPopup() {
    fieldName.value = profileName.textContent; 
    fieldStatus.value = profileStatus.textContent;
    popup.classList.add('popup_isopen');
}

function closePopup() {
    popup.classList.remove('popup_isopen');
} 

function submitForm(event) {
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

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('mouseup', popupClickHandler);
popupForm.addEventListener('submit', submitForm);
contentAddButton.addEventListener('click', openPopup);