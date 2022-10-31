import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  delete(data) {
    //deletes card from DOM
    api.removeCard(data);
  }
}
