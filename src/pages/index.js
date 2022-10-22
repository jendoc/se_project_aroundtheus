// Import stylesheet
import "./index.css";

// Import all the classes
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
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

const editFormPopup = new PopupWithForm({
  popupSelector: selectors.editPopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

    editFormPopup.closePopup();
    editFormValidator.disableButton();
  },
});
const addFormPopup = new PopupWithForm({
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
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// All the rest
editProfileButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  inputName.value = name;
  inputAboutMe.value = description;
  editFormPopup.openPopup();
});

addCardButton.addEventListener("click", () => {
  addFormPopup.openPopup();
});
