import { data } from "autoprefixer";

export default class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = data._userId;
    this._ownerId = data.owner._id;

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

  _showlikes() {
    this._totalLikes.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("card__like-button_active");
  };

  _handleDelete = () => {
    this._card.remove();
    this._card = null;
  };

  _hideDelete() {
    if (this._userId !== this._ownerId) {
      this._card.querySelector(".card__delete-button").remove();
    }
  }

  _setEventListeners() {
    this._card
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ link: this._link, name: this._name })
      );
    this._likeButton.addEventListener("click", this._handleLike);
    this._card
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDelete);
    // change to first confirm before deleting
  }

  setLikes(likes) {
    this._likes = likes;
    this._showlikes();
  }

  isLiked() {
    return Boolean(this._likes.find((user) => user._id === this._userId));
  }

  getView() {
    this._card = this._getTemplate();

    this._likeButton = this._card.querySelector(".card__like-button");
    const imageElement = this._card.querySelector(".card__image");
    const cardname = this._card.querySelector(".card__title");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    cardname.textContent = this._name;
    this._totalLikes = this._card.querySelector(".card__like-count");

    this._setEventListeners();

    return this._card;
  }
}
