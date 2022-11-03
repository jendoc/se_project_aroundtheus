import Popup from "./Popup";

export default class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(".modal__submit-button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  setEventsListeners() {
    super.setEventsListeners();
    this._popupForm.addEventListener("submit", this.handleSubmit);
  }
  
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  removeEventsListeners() {
    super.removeEventsListeners();
    this._popupForm.removeEventListener("submit", this.handleSubmit);
  }

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
  }
}
