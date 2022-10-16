// Import stylesheet
import "./pages/index.css";

// Import all the classes
import UserInfo from "./components/UserInfo";
import FormValidator from "./components/FormValidator";
import Card from "./components/Card";
import Section from "./components/Section";
import PopupWithImage from "./components/PopupwithImage";
import PopupWithForms from "./components/PopupWithForms";
import { initialCards, selectors, configObject } from "./utils/constants";

const editProfileButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

// Class Instances
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

const EditFormPopup = new PopupWithForms({
  popupSelector: selectors.editPopup,
  handleFormSubmit: (inputValues) => {
    console.log(inputValues);
  }
});

const AddFormPopup = new PopupWithForms({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (data) => {
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
}
  //addFormValidator.disableButton();
);

//const editFormValidator = new FormValidator(configObject, editForm);
//const addFormValidator = new FormValidator(configObject, selectors.addForm);

// Initialize Classes
CardSection.renderItems(initialCards);
CardPreviewPopup.setEventsListeners();
AddFormPopup.setEventsListeners();
//editFormValidator.enableValidation();
//addFormValidator.enableValidation();

// All the rest
editProfileButton.addEventListener("click", () => {
  //fillProfileForm();
  EditFormPopup.openPopup();
});

addCardButton.addEventListener("click", () => {
  AddFormPopup.openPopup();
});
