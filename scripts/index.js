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
const popupCloseButtonEdit = document.querySelector('.popup__button_action_close-edit');//new
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
const popupCloseButtonAdd = document.querySelector('.popup__button_action_close-add');
//like element feature

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
 element.querySelector('.element__button_action_delete').addEventListener('click', (event) => {
  event.target.closest('.element').remove();
});
element.querySelector('.element__button_action_like').addEventListener('click', (event) =>{
  event.target.classList.toggle('element__button_action_like_active');
})
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
function closeEditPopup() {
  popupEditProfile.classList.remove('popup_isopen');
} 
function openAddPopup() {
  popupAddContent.classList.add('popup_isopen');
}
function closeAddPopup() {
  popupAddContent.classList.remove('popup_isopen');
} 
function editProfile(event) {
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileStatus.textContent = fieldStatus.value;
  closeEditPopup();
}

function popupClickHandler(event) {
    if (event.target.classList.contains('popup')) {
      closePopup();
    }
}

//add content feature
function addElement(event){
  event.preventDefault();
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = placeUrl.value;
  element.querySelector('.element__image').alt = placeUrl.value;
  element.querySelector('.element__title').textContent = placeName.value;
  element.querySelector('.element__button_action_delete').addEventListener('click', (event) => {
    event.target.closest('.element').remove();
  });
  element.querySelector('.element__button_action_like').addEventListener('click', (event) =>{
    event.target.classList.toggle('element__button_action_like_active');
  })
  elements.prepend(element);
  closeAddPopup();
  placeName.value = '';
  placeUrl.value = '';
}
popupFormAddContent.addEventListener('submit', addElement);

profileEditButton.addEventListener('click', openEditPopup);
popupCloseButtonEdit.addEventListener('click', closeEditPopup);
popup.addEventListener('mouseup', popupClickHandler);
popupForm.addEventListener('submit', editProfile);
contentAddButton.addEventListener('click', openAddPopup);
popupCloseButtonAdd.addEventListener('click', closeAddPopup);