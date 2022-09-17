const initialCards = [
  {
    title: "Grand Prismatic Spring",
    link: "https://images.unsplash.com/photo-1533419784160-1f7f79022119?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80",
  },
  {
    title: "Thor's Well",
    link: "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80",
  },
  {
    title: "Multnomah Falls",
    link: "https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
  },
  {
    title: "Lake Tahoe",
    link: "https://images.unsplash.com/photo-1548954042-c23fc6226ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
  },
  {
    title: "Antelope Canyon",
    link: "https://images.unsplash.com/photo-1602088693260-78f2c76287c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    title: "Cape Elizabeth",
    link: "https://images.unsplash.com/photo-1520450202524-87e5dd06a74b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
];

// Page components
const cardTemplate = document.querySelector("#card").content;
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
const inputTitle = document.querySelector(".modal__title");
const inputImageLink = document.querySelector(".modal__image-link");

const imageModal = document.querySelector("#image-modal");
const modalImage = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");

// Buttons
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editCloseButton = editModal.querySelector(".modal__close-button");
const addCloseButton = addModal.querySelector(".modal__close-button");
const imageCloseButton = imageModal.querySelector(".modal__close-button");

// Functions & Event Listeners

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

editButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;

  openModal(editModal);
});

addButton.addEventListener("click", () => {
  openModal(addModal);
});

editCloseButton.addEventListener("click", () => {
  closeModal(editModal);
});

addCloseButton.addEventListener("click", () => {
  closeModal(addModal);
});

imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

function saveProfileEdits(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closeModal(editModal);
}

editForm.addEventListener("submit", saveProfileEdits);

function renderCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.title;
  cardTitle.textContent = cardData.title;
  cardList.prepend(card);
  cardImage.addEventListener("click", function () {
    openModal(imageModal);
    modalImage.src = cardData.link;
    modalImage.alt = cardData.title;
    modalCaption.textContent = cardData.title;
  });

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", function () {
    const badCard = deleteButton.closest(".card");
    badCard.remove();
  });
}

initialCards.forEach(function (cardData) {
  renderCard(cardData);
});

addForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;
  renderCard({
    title,
    link,
  });
  closeModal(addModal);
  addForm.reset();
});
