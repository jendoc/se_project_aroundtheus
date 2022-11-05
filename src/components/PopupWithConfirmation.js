import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    (this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    )),
      (this._submitButtonText = this._submitButton.textContent);
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  open(handleConfirm) {
    this._popupElement.classList.add("modal_opened");
    this._handleConfirm = handleConfirm;
    this.setEventsListeners();
  }

  close() {
    super.closePopup();
    this.removeEventsListeners();
  }

  setEventsListeners() {
    this._submitButton.addEventListener("click", this._handleConfirm)
    super.setEventsListeners();
}

  removeEventsListeners() {
    this._submitButton.removeEventListener("click",this._handleConfirm);
    super.removeEventsListeners();
    return;
  }
}
