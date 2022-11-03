export default class Card {
  constructor(
    { data, handleImageClick, handleDeleteClick, userId },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;

    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _renderlikes() {
    //this._totalLikes.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _addDeleteIcon() {
    this._deleteButton.classList.remove("card__delete-button_hidden");
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this)
    );
  }

  _setEventListeners() {
    this._card
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ link: this._link, name: this._name })
      );
    this._likeButton.addEventListener("click", this._handleLike);
  }

  removeCard() {
    this._card.remove();
    this._card = null;
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderlikes();
  }

  isLiked() {
    //return this._likes.some((item) => item._id === this._userId);
  }

  getCardId() {
    return this._cardId;
  }

  getView() {
    this._card = this._getTemplate();

    this._likeButton = this._card.querySelector(".card__like-button");
    this._deleteButton = this._card.querySelector(".card__delete-button");
    const imageElement = this._card.querySelector(".card__image");
    const cardname = this._card.querySelector(".card__title");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    cardname.textContent = this._name;
    this._totalLikes = this._card.querySelector(".card__like-count");

    if (this._ownerId === this._userId) {
      this._addDeleteIcon();
    }

    this._setEventListeners();
    return this._card;
  }
}
