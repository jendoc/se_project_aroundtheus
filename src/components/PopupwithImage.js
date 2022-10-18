import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._imageCaption = this._popupElement.querySelector(".modal__caption");
  }

  open({link, title}) {
    this._imageElement.src = link;
    this._imageElement.alt = `Image of ${title}`;
    this._imageCaption.textContent = title;
    super.openPopup();
  }
}
