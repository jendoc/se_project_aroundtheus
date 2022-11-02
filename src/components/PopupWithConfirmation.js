import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._handleDelete = handleDelete,
    this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
  }

  open({id}) {
    this._cardId = id;
    
    super.openPopup()
  }

  setEventsListeners() {
    super.setEventsListeners();
    this._submitButton.addEventListener("click", this._handleDelete)
  }
}
