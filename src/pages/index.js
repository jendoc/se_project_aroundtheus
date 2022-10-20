// Import stylesheet
import "./index.css";

// Import all the classes
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForms from "../components/PopupWithForms";
import { initialCards, selectors, validationConfig } from "../utils/constants";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const inputName = document.querySelector(".modal__name");
const inputAboutMe = document.querySelector(".modal__about-me");

const renderCard = (data) => {
  const cardEl = new Card(
    {
      data,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
    },
    selectors.cardTemplate
  );
  cardSection.addItem(cardEl.getView());
};

// Class Instances
const userInfo = new UserInfo(selectors.userName, selectors.userAboutMe);

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  selectors.cardList
);

const editFormValidator = new FormValidator(
  validationConfig,
  selectors.editForm
);
const addFormValidator = new FormValidator(validationConfig, selectors.addForm);

const editFormPopup = new PopupWithForms({
  popupSelector: selectors.editPopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

    editFormPopup.closePopup();
    editFormValidator.disableButton();

    inputName.value = data.name;
    inputAboutMe.value = data.description;
  },
});

const addFormPopup = new PopupWithForms({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (item) => {
    renderCard(item);
    addFormPopup.closePopup();
    addFormValidator.disableButton();
  },
});

// Initialize Classes
cardSection.renderItems(initialCards);
cardPreviewPopup.setEventsListeners();
addFormPopup;
editFormPopup;
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// All the rest
editProfileButton.addEventListener("click", () => {
  editFormPopup.openPopup();
});

addCardButton.addEventListener("click", () => {
  addFormPopup.openPopup();
});
