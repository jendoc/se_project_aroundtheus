import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import * as Utils from "./Utils.js";
import { initialCards, configObject } from "./constants.js";

// Page components
const cardList = document.querySelector(".gallery__grid");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__description");

// Modal components
const editModal = document.querySelector("#edit-modal");
const editForm = editModal.querySelector(".modal__form_edit");
const inputName = document.querySelector(".modal__name");
const inputAboutMe = document.querySelector(".modal__about-me");

const addModal = document.querySelector("#add-modal");
const addForm = addModal.querySelector(".modal__form_add");

const imageModal = document.querySelector("#image-modal");
const modalImage = document.querySelector(".modal__image");
const imageModalCaption = document.querySelector(".modal__caption");

// Buttons
const addSubmitButton = addModal.querySelector(".modal__submit-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".modal__close-button");

// Render
function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
}

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  Utils.openModal(editModal);
});

addCardButton.addEventListener("click", () => {
  Utils.openModal(addModal);
});

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => Utils.closeModal(modal));
});

function saveProfileEdits(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  Utils.closeModal(editModal);
}

editForm.addEventListener("submit", saveProfileEdits);

function openImagePreview() {
  modalImage.src = this._link;
  modalImage.alt = `Photo of ${this._title}`;
  imageModalCaption.textContent = this._title;
  Utils.openModal(imageModal);
}

function renderCard(data, container) {
  const newCard = new Card(data, "#card-template", openImagePreview).getView();
  container.prepend(newCard);
}

initialCards.forEach((data) => {
  renderCard(data, cardList);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;
  renderCard(
    {
      title,
      link,
    },
    cardList
  );

  Utils.closeModal(addModal);
  addForm.reset();
  addSubmitButton.classList.add("modal__submit-button_disabled");
  addFormValidator.disableButton();
});

// Validation

const editFormValidator = new FormValidator(configObject, editForm);
const addFormValidator = new FormValidator(configObject, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
