export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`#${popupSelector}`);
    this._handleEscDown = this._handleEscDown.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
    this._closeButtons = document.querySelectorAll(".modal__close-button");
  }

  openPopup() {
    this._popupElement.classList.add("modal_opened");
  }

  closePopup() {
    this._popupElement.classList.remove("modal_opened");
  }

  setEventsListeners() {
    this._closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.closePopup();
        // Fires 3 times
        // 
      });
    });

    document.addEventListener("keydown", this._handleEscDown);
    this._popupElement.addEventListener("mousedown", this._handleOverlay);
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
