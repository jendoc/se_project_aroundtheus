const initialCards = [
  {
    title: "Cape Elizabeth",
    link: "https://images.unsplash.com/photo-1520450202524-87e5dd06a74b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
  {
    title: "Antelope Canyon",
    link: "https://images.unsplash.com/photo-1602088693260-78f2c76287c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    title: "Lake Tahoe",
    link: "https://images.unsplash.com/photo-1548954042-c23fc6226ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
  },
  {
    title: "Multnomah Falls",
    link: "https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
  },
  {
    title: "Thor's Well",
    link: "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80",
  },
  {
    title: "Grand Prismatic Spring",
    link: "https://images.unsplash.com/photo-1533419784160-1f7f79022119?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80",
  },
];

// Page elements
const cardTemplate = document.querySelector("#card").content;
const cardList = document.querySelector(".gallery__grid");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__description");
let galleryPhoto = document.querySelectorAll(".card__image");

// Modal components
const profileModal = document.querySelector("#edit-modal");
const addModal = document.querySelector("#add-modal");
const galleryModal = document.querySelector("#gallery-modal");
const editForm = document.querySelector(".modal__form_edit");
const addForm = document.querySelector(".modal__form_add");

// Edit modal input
const inputName = document.querySelector(".modal__name");
const inputAboutMe = document.querySelector(".modal__about-me");
const inputTitle = document.querySelector(".modal__title");
const inputImageLink = document.querySelector(".modal__image-link");

// Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const likeButton = document.querySelectorAll(".card__like-button");
const deleteButton = document.querySelectorAll(".card__delete-button");

const editCloseButton = profileModal.querySelector(".modal__close-button");
const addCloseButton = addModal.querySelector(".modal__close-button");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;

  openModal(profileModal);
});

addButton.addEventListener("click", () => {
  openModal(addModal);
});

editCloseButton.addEventListener("click", function () {
  closeModal(profileModal);
});

addCloseButton.addEventListener("click", function () {
  closeModal(addModal);
});

function saveProfileEdits(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closeModal(profileModal);
}

editForm.addEventListener("submit", saveProfileEdits);

function renderCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.title;
  cardTitle.textContent = cardData.title;
  cardList.prependChild(card);
}

initialCards.forEach(function (cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.title;
  cardTitle.textContent = cardData.title;
  cardList.appendChild(card);
});

// function deleteCard() {
//    *remove closest parent from html
//}

// function likeCard() {
//    *swap empty heart for filled in SVG
//}
