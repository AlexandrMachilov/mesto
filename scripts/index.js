const popupList = [...document.querySelectorAll('.popup')];
//Edit profile feature
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupCloseButton = document.querySelector('.popup__button_action_close');
const profileEditButton = document.querySelector('.profile__button_action_edit');
const popupFormEditContent = document.querySelector('.popup__form_edit-content');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const fieldName = document.querySelector('.popup__input_type_name');
const fieldStatus = document.querySelector('.popup__input_type_status');
const popupCloseButtonEdit = document.querySelector('.popup__button_action_close-edit');
//Insert default cards feature
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content;
//Add content feature
const contentAddButton = document.querySelector('.profile__button_action_add');
const popupAddContent = document.querySelector('.popup_type_add');
const popupFormAddContent = document.querySelector('.popup__form_add-content');
const placeName = document.querySelector('.popup__input_type_place-name');
const placeUrl = document.querySelector('.popup__input_type_place-url');
const addContentButton = document.querySelector('.popup__button_action_add-content');
const popupCloseButtonAdd = document.querySelector('.popup__button_action_close-add');
//Show full-size images feature
const popupShowImage = document.querySelector('.popup_type_show-image');
const popupCloseButtonImage = document.querySelector('.popup__button_action_close-image');
const popupImage = popupShowImage.querySelector('.popup__image');
const popupCaption = popupShowImage.querySelector('.popup__caption');

initialCards.forEach(appendElement);

function appendElement(card){
  const element = createElement(card);
  elements.append(element);
}

function prependElement(card){
  const element = createElement(card);
  elements.prepend(element);
}

function createElement(card){
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementButtonDelete = element.querySelector('.element__button_action_delete');
  const elementButtonLike = element.querySelector('.element__button_action_like');
  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementTitle.textContent = card.name;
  elementButtonDelete.addEventListener('click', deleteElement);
  elementButtonLike.addEventListener('click', likeElement);
  elementImage.addEventListener('click', ()=> showImage(card));
  return element;
};

const showImage = (data) => {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupCaption.textContent = data.name;
  openPopup(popupShowImage);
} 

function deleteElement(event){
  event.target.closest('.element').remove();  
}

function likeElement(event){
  event.target.classList.toggle('element__button_action_like_active');
}

function openPopup(popupName) {
  popupName.classList.add('popup_isopen');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByOverlay);
}

function openEditPopup() {
  fieldName.value = profileName.textContent; 
  fieldStatus.value = profileStatus.textContent;
  checkPopupState(popupEditProfile, config);
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
  checkPopupState(popupAddContent, config);
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

