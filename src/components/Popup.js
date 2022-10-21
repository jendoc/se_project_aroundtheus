export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`#${popupSelector}`);
    this._handleEscDown = this._handleEscDown.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    this.closePopup = this.closePopup.bind(this);
  }

  openPopup() {
    this._popupElement.classList.add("modal_opened");
    this.setEventsListeners();
  }

  closePopup() {
    this._popupElement.classList.remove("modal_opened");
    this.removeEventsListeners();
  }

  setEventsListeners() {
    this._closeButton.addEventListener("click", () => {
      this.closePopup();
    });

    document.addEventListener("keydown", this._handleEscDown);
    this._popupElement.addEventListener("mousedown", this._handleOverlay);
  }

  removeEventsListeners() {
    this._closeButton.removeEventListener("click", this.closePopup);
    document.removeEventListener("keydown", this._handleEscDown);
    this._popupElement.removeEventListener("mousedown", this._handleOverlay);
  }

  _handleEscDown(evt) {
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
