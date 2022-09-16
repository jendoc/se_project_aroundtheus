const initialCards = [
  {
    name: "Cape Elizabeth",
    link: "https://images.unsplash.com/photo-1520450202524-87e5dd06a74b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
  {
    name: "Antelope Canyon",
    link: "https://images.unsplash.com/photo-1602088693260-78f2c76287c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    name: "Lake Tahoe",
    link: "https://images.unsplash.com/photo-1548954042-c23fc6226ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
  },
  {
    name: "Multnomah Falls",
    link: "https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
  },
  {
    name: "Thor's Well",
    link: "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80",
  },
  {
    name: "Grand Prismatic Spring",
    link: "https://images.unsplash.com/photo-1533419784160-1f7f79022119?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80",
  },
];

// Cards
const cardTemplate = document.querySelector("#card").content;
const cardList = document.querySelector(".gallery__grid");

// Card elements
const editButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector("#edit-profile");
const editPopup = document.querySelector("#add-content");
const photoDisplay = document.querySelector("#photo-display");
const profileCloseButton = document.querySelector(".modal__close-button");
const likeButton = document.querySelectorAll(".card__like-button");
const deleteButton = document.querySelectorAll(".card__delete-button");

// Profile elements
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__description");

// Edit modal input
const inputName = document.querySelector(".modal__name");
const inputAboutMe = document.querySelector(".modal__about-me");
const editForm = document.querySelector(".modal__form");

function openEdit() {
  profilePopup.classList.add("modal_opened");
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
}

function closeEdit() {
  profilePopup.classList.remove("modal_opened");
}

editButton.addEventListener("click", openEdit);
profileCloseButton.addEventListener("click", closeEdit);

function saveProfileEdits(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closeEdit();
}

editForm.addEventListener("submit", saveProfileEdits);

initialCards.forEach(function (cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardList.appendChild(card);
});

function deleteCard(card) {}

deleteButton.addEventListener("click", deleteCard);
