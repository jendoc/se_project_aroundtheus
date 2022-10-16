import Popup from "./Popup";

export default class PopupWithForms extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popupForm.querySelectorAll(".modal__input"));
    this._inputValues = {};
    this._inputList.forEach((input) => (this._inputValues[input.name] = input.value));
    return this._inputValues;
  }

  setEventsListeners() {
    super.setEventsListeners();
    
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.closePopup();
    });
  }

  closePopup() {
    this._popupForm.reset();
    super.closePopup();
  }
}
