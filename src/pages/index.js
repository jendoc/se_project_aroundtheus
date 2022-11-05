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
  const card = new Card(
    {
      data,
      handleImageClick: (imgData) => {
        cardPreviewPopup.open(imgData);
      },
      handleDeleteClick: () => {
        confirmationPopup.open(() => {
          confirmationPopup.renderLoading(true);
          api
            .deleteCard(data._id)
            .then(() => {
              card.removeCard();
              confirmationPopup.close();
            })
            .catch((err) => console.log(`An error occured: ${err}`))
            .finally(() => confirmationPopup.renderLoading(false));
        });
      },
      handleLikeClick: () => {
        if (card.isLiked()) {
          api
            .removeLike(card._cardId)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`An error occured: ${err}`);
            });
        } else {
          api
            .addLike(card._cardId)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`An error occured: ${err}`);
            });
        }
      },
      userId: userInfo.getId(),
    },
    selectors.cardTemplate
  );
  cardSection.addItem(card.getView());
  card.setLikes(data.likes);
};

const api = new Api({
  url: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e81f67bc-340b-41c4-ba13-967f5deca81e",
    "Content-Type": "application/json",
  },
});

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const confirmationPopup = new PopupWithConfirmation(
  selectors.deletePopup,
  handleDelete
);

function handleDelete(card) {
  const cardId = card._Id;
  api
    .deleteCard(cardId)
    .then((res) => {
      card.removeCard();
      card = null;
      confirmationPopup.closePopup();
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      selectors.cardList
    );
    cardSection.renderItems();
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
    editFormPopup.renderLoading(true);
    api
      .updateProfile(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editFormPopup.closePopup();
      })
      .catch((err) => {
        console.log(`An error occured ${err}`);
      })
      .finally(() => editFormPopup.renderLoading(false));
  },
});

const addFormPopup = new PopupWithForm({
  popupSelector: selectors.addPopup,
  handleFormSubmit: (data) => {
    addFormPopup.renderLoading(true);
    api
      .uploadCard(data)
      .then((data) => {
        renderCard(data);
        addFormPopup.closePopup();
        addFormValidator.disableButton();
      })
      .catch((err) => console.log(`An error occured ${err}`))
      .finally(() => addFormPopup.renderLoading(false));
  },
});

const avatarFormPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopup,
  handleFormSubmit: (data) => {
    avatarFormPopup.renderLoading(true);
    api
      .updateAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        avatarFormPopup.closePopup();
      })
      .catch((err) => console.log(`An error occured ${err}`))
      .finally(() => avatarFormPopup.renderLoading(false));
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
  editFormValidator.disableButton();
  editFormPopup.openPopup();
});

addCardButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addFormPopup.openPopup();
});

avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.disableButton();
  avatarFormPopup.openPopup();
});
