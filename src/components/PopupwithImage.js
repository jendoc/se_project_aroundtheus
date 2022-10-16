import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._imageCaption = this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = `Image of ${data.title}`;
    this._imageCaption.textContent = data.title;
    super.openPopup();
  }
}
