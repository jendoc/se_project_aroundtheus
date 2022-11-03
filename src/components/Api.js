export default class Api {
  constructor(info) {
    this._url = info.url;
    this._headers = info.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  async getUserInfo() {
    const res = await fetch(this._url + "/users/me", {
      headers: this._headers,
    });
    return this._getResponse(res);
  }

  async getInitialCards() {
    const res = await fetch(this._url + "/cards", {
      headers: this._headers,
    });
    return this._getResponse(res);
  }

  async updateProfile(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  async uploadCard(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  async deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
  }

  async updateAvatar(data) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    });
  }

  async getLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: this._headers,
    });
  }

  async addLike(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        //likes: [++]
      }),
    });
  }

  async removeLike(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        //likes: remove one
      }),
    });
  }
}
