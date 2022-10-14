class Popup {
  constructor(popupSelector) {}

  _openModal(modal) {
    modal.classList.add("modal_opened");

    document.addEventListener("keydown", handleEsc);
    modal.addEventListener("mousedown", handleOverlay);
  }

  _closeModal(modal) {
    modal.classList.remove("modal_opened");

    document.removeEventListener("keydown", handleEsc);
    modal.removeEventListener("mousedown", handleOverlay);
  }

  setEventsListeners() {
    // adds "click" evt listener to the close icon
    // adds "click" evt listener to the overlay
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      closeModal(openedModal);
    }
  }
}

export default Popup;
