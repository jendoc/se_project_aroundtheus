let initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close-button");

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__description");

const inputName = document.querySelector(".modal__name");
const inputAboutMe = document.querySelector(".modal__about-me");
const submitButton = document.querySelector(".modal__submit-button");

function openEdit() {
  modal.classList.add("modal_opened");
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
}

function closeEdit() {
  modal.classList.remove("modal_opened");
}

editButton.addEventListener("click", openEdit);
closeButton.addEventListener("click", closeEdit);

function saveProfileEdits(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closeEdit();
};

submitButton.addEventListener("click", saveProfileEdits);