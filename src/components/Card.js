class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._title = data.title;
    this._link = data.link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDelete = () => {
    this._card.remove();
    this._card = null;
  };

  _setEventListeners() {
    this._card
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ link: this._link, title: this._title })
      );
    this._likeButton.addEventListener("click", this._handleLike);
    this._card
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);
  }

  getView() {
    this._card = this._getTemplate();

    this._likeButton = this._card.querySelector(".card__like-button");
    const imageElement = this._card.querySelector(".card__image");
    const cardTitle = this._card.querySelector(".card__title");

    imageElement.src = this._link;
    imageElement.alt = this._title;
    cardTitle.textContent = this._title;

    this._setEventListeners();

    return this._card;
  }
}

export default Card;
