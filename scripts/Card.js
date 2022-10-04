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

class Card {
  constructor(data, cardSelector) {
    this.title = data.title;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._cardSelector)
      .content.querySelector("#card")
      .cloneNode(true);

    return cardEl;
  }

  _handleLike() {
    
  }

  _handleDelete() {
    this._card.remove();
  }

  _handlePreviewPicture() {}

  _setEventListeners() {}

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(".modal__image").src = `url(${data.link})`;
    this._card.querySelector(".modal__image").alt = data.name;

    return this._card;
  }
}

const initialCards = [
  {
    title: "Grand Prismatic Spring",
    link: "https://images.unsplash.com/photo-1533419784160-1f7f79022119?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80",
  },
  {
    title: "Thor's Well",
    link: "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80",
  },
  {
    title: "Multnomah Falls",
    link: "https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
  },
  {
    title: "Lake Tahoe",
    link: "https://images.unsplash.com/photo-1548954042-c23fc6226ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
  },
  {
    title: "Antelope Canyon",
    link: "https://images.unsplash.com/photo-1602088693260-78f2c76287c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    title: "Cape Elizabeth",
    link: "https://images.unsplash.com/photo-1520450202524-87e5dd06a74b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
  },
];

export default Card;
