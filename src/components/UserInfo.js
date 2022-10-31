export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(
      userDescriptionSelector
    );
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
    this._userAvatarElement.src = avatar;
  }

  setAvatar(data) {
    this._userAvatarElement.src = data.link;
  }
}
