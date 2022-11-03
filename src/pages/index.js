// Import stylesheet
import "./index.css";

// Import all the classes
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/FormValidator";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import { selectors, validationConfig } from "../utils/constants";
import Api from "../components/Api";

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const inputName = document.querySelector(".modal__name");
const inputAboutMe = document.querySelector(".modal__about-me");
let cardSection;

const userInfo = new UserInfo(
  selectors.userName,
  selectors.userAboutMe,
  selectors.userAvatar
);

const renderCard = (data) => {
  const cardEl = new Card(
    {
      data,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
      handleDeleteClick: () => {
        const card = data;
        passCard(card);
      },
      userId: userInfo.getId()
    },
    selectors.cardTemplate
  );
  cardSection.addItem(cardEl.getView());
  cardEl.setLikes(data.likes);
};

const api = new Api({
  url: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e81f67bc-340b-41c4-ba13-967f5deca81e",
    "Content-Type": "application/json",
  },
});

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const confirmationPopup = new PopupWithConfirmation(selectors.deletePopup, handleDelete);

function passCard(card) {
  confirmationPopup.open(card)
}

function handleDelete(card) {
  const cardId = card._id;
  api.deleteCard(cardId)
  .then((res) => {
  card.removeCard();
  card = null;
    confirmationPopup.closePopup();
    console.log(res);
  })
  .catch((err) => {
    console.log(err)
  })
};

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
      debugger;
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

const avatarFormValidator = new FormValidator(
  validationConfig,
  selectors.avatarForm
);

const editFormPopup = new PopupWithForm({
  popupSelector: selectors.editPopup,
  handleFormSubmit: (data) => {
    console.log(data);
    userInfo.setUserInfo(data);
    api.updateProfile(data);

    editFormPopup.closePopup();
    editFormValidator.disableButton();
  },
});
const addFormPopup = new PopupWithForm({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (data) => {
    renderCard(data);
    api.uploadCard(data);
    addFormPopup.closePopup();
    addFormValidator.disableButton();
  },
});

const avatarFormPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopup,
  handleFormSubmit: (data) => {
    userInfo.setAvatar(data);
    api.updateAvatar(data);
    avatarFormPopup.closePopup();
    avatarFormValidator.disableButton();
  },
});

// Initialize Classes
cardPreviewPopup.setEventsListeners();
confirmationPopup.setEventsListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Button Event Listeners
editProfileButton.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  inputName.value = name;
  inputAboutMe.value = about;
  editFormPopup.openPopup();
});

addCardButton.addEventListener("click", () => {
  addFormPopup.openPopup();
});

avatarEditButton.addEventListener("click", () => {
  avatarFormPopup.openPopup();
});