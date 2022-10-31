import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._imageCaption = this._popupElement.querySelector(".modal__caption");
  }

  open({link, name}) {
    this._imageElement.src = link;
    this._imageElement.alt = `Image of ${name}`;
    this._imageCaption.textContent = name;
    super.openPopup();
  }
}
