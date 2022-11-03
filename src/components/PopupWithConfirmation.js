import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFunc) {
    super(popupSelector);
    this._submitFunc = submitFunc,
    this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
  }

  open(item) {
    this._cardToDelete = item;
    super.openPopup()
  }

  setEventsListeners() {
    super.setEventsListeners();
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      console.log("Goodbye!!")
      this._submitFunc(this._cardToDelete);
    })
  }
}
