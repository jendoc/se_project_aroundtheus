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

  async updateProfile(userName, userAboutMe) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAboutMe,
      }),
    }).then(this._getResponse);
  }
}
