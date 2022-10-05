const imageModal = document.querySelector("#image-modal");
const modalImage = imageModal.querySelector(".modal__image");
const modalCaption = imageModal.querySelector(".modal__caption");

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handleOverlay(evt) {
  if (evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");

  document.addEventListener("keydown", handleEsc);
  modal.addEventListener("mousedown", handleOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  document.removeEventListener("keydown", handleEsc);
  modal.removeEventListener("mousedown", handleOverlay);
}

//Card class

class Card {
  constructor(data, cardSelector) {
    this._title = data.title;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLike() {
    this.classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    const badCard = this.closest(".card");
    badCard.remove();
  }

  _handlePreviewPicture() {
    openModal(imageModal);
    modalImage.src = `${this._link}`;
    modalImage.alt = this._title;
    modalCaption.textContent = this._title;
  }

  _setEventListeners() {
    this._card
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewPicture());
    this._card
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLike);
    this._card
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);
  }

  getView() {
    this._card = this._getTemplate();

    this._card.querySelector(".card__image").src = `${this._link}`;
    this._card.querySelector(".card__image").alt = this._title;
    this._card.querySelector(".card__title").textContent = this._title;

    this._setEventListeners();

    return this._card;
  }
}

export default Card;
