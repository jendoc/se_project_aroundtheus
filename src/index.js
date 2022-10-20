// Import stylesheet
import "./pages/index.css";

// Import all the classes
import UserInfo from "./components/UserInfo";
import FormValidator from "./components/FormValidator";
import Card from "./components/Card";
import Section from "./components/Section";
import PopupWithImage from "./components/PopupwithImage";
import PopupWithForms from "./components/PopupWithForms";
import { initialCards, selectors, validationConfig } from "./utils/constants";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const inputName = document.querySelector(".modal__name");
const inputAboutMe = document.querySelector(".modal__about-me");

// Class Instances
const userInfo = new UserInfo(selectors.userName, selectors.userAboutMe);

const CardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const CardSection = new Section(
  {
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          handleImageClick: (imgData) => {
            CardPreviewPopup.open(imgData);
          },
        },
        selectors.cardTemplate
      );
      CardSection.addItem(cardEl.getView());
    },
  },
  selectors.cardList
);

const EditFormValidator = new FormValidator(validationConfig, selectors.editForm);
const AddFormValidator = new FormValidator(validationConfig, selectors.addForm);

const EditFormPopup = new PopupWithForms({
  popupSelector: selectors.editPopup,
  handleFormSubmit: (data) => {
    let editInputValues = {};

    userInfo.setUserInfo(data);

    EditFormPopup.closePopup();
    EditFormValidator.disableButton();
    
    editInputValues = userInfo.getUserInfo();

    inputName.value = editInputValues.name;
    inputAboutMe.value = editInputValues.description;
  },
});

const AddFormPopup = new PopupWithForms(
  {
    popupSelector: selectors.addPopup,
    handleFormSubmit: (data) => {
      const newCard = new Card(
        {
          data,
          handleImageClick: (imgData) => {
            CardPreviewPopup.open(imgData);
          },
        },
        selectors.cardTemplate
      );
      CardSection.addItem(newCard.getView());
      AddFormPopup.closePopup();
      AddFormValidator.disableButton();
    },
  },
);

// Initialize Classes
CardSection.renderItems(initialCards);
CardPreviewPopup.setEventsListeners();
AddFormPopup.setEventsListeners();
EditFormPopup.setEventsListeners();
EditFormValidator.enableValidation();
AddFormValidator.enableValidation();

// All the rest
editProfileButton.addEventListener("click", () => {
  EditFormPopup.openPopup();
});

addCardButton.addEventListener("click", () => {
  AddFormPopup.openPopup();
});
