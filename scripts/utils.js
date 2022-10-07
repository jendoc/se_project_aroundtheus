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

export { handleEsc, handleOverlay, openModal, closeModal };
