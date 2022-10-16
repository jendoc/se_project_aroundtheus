export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`#${popupSelector}`);
    this._handleEscUp = this._handleEscUp.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
    this._closeButtons = document.querySelectorAll(".modal__close-button");
  }

  openPopup() {
    this._popupElement.classList.add("modal_opened");

    this.setEventsListeners();
  }

  closePopup() {
    this._popupElement.classList.remove("modal_opened");

    document.removeEventListener("keydown", this._handleEscUp);
    this._popupElement.removeEventListener("mousedown", this._handleOverlay);
  }

  setEventsListeners() {
    this._closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.closePopup();
      });
    });

    document.addEventListener("keydown", this._handleEscUp);
    this._popupElement.addEventListener("mousedown", this._handleOverlay);
  }

  _handleEscUp(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  _handleOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
      this.closePopup();
    }
  }
}
