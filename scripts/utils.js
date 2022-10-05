// Page components
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

// Buttons
const addSubmitButton = addModal.querySelector(".modal__submit-button");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".modal__close-button");

function handleEsc(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      closeModal(openedModal);
    }
  }
  
  function handleOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
      closeModal(evt.target);
    }
  }
  
  function openModal(modal) {
    modal.classList.add("modal_opened");
  
    document.addEventListener("keydown", handleEsc);
    modal.addEventListener("mousedown", handleOverlay);
  }
  
  function closeModal(modal) {
    modal.classList.remove("modal_opened");
  
    document.removeEventListener("keydown", handleEsc);
    modal.removeEventListener("mousedown", handleOverlay);
  }

  function fillProfileForm() {
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
  }

editButton.addEventListener("click", () => {
    fillProfileForm();
    openModal(editModal);
  });
  
  addButton.addEventListener("click", () => {
    openModal(addModal);
  });
  
  closeButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => closeModal(modal));
  });

  function saveProfileEdits(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAboutMe.textContent = inputAboutMe.value;
    closeModal(editModal);
  }
  
  editForm.addEventListener("submit", saveProfileEdits);