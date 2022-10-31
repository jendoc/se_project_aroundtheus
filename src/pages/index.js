// Import stylesheet
import "./index.css";

// Import all the classes
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import { selectors, validationConfig } from "../utils/constants";
import Api from "../components/Api";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const inputName = document.querySelector(".modal__name");
const inputAboutMe = document.querySelector(".modal__about-me");
let cardSection;

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
const api = new Api({
  url: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e81f67bc-340b-41c4-ba13-967f5deca81e",
    "Content-Type": "application/json"
  },
});

const userInfo = new UserInfo(selectors.userName, selectors.userAboutMe);

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(
    (cardSection = new Section(
      {
        items: [],
        renderer: renderCard,
      },
      selectors.cardList
    ))
  )
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cards.map((card) => {
      renderCard(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const editFormValidator = new FormValidator(
  validationConfig,
  selectors.editForm
);
const addFormValidator = new FormValidator(validationConfig, selectors.addForm);

const editFormPopup = new PopupWithForm({
  popupSelector: selectors.editPopup,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    api.updateProfile(data);

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
