import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
  }

  delete(data) {
    //deletes card from DOM
    api.removeCard(data);
  }
}
