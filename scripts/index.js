const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__button_action_close');
const profileEditButton = document.querySelector('.button__action_edit');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const fieldName = document.querySelector('.popup__input_type_name');
const fieldStatus = document.querySelector('.popup__input_type_status');


function openPopup() {
    fieldName.value = profileName.textContent; 
    fieldStatus.value = profileStatus.textContent;
    popup.classList.add('popup_isOpen');
    console.log('open');
}

function closePopup() {
    popup.classList.remove('popup_isOpen');
    console.log('close');
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
popup.addEventListener('click', popupClickHandler);
popupForm.addEventListener('submit', submitForm);