const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__button_action_close');
const profileEditButton = document.querySelector('.profile__button_action_edit');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const fieldName = document.querySelector('.popup__input_type_name');
const fieldStatus = document.querySelector('.popup__input_type_status');


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