export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = document.querySelector(`.${userNameSelector}`);
    this._userDescriptionElement = document.querySelector(`${userDescriptionSelector}`)
  }

  getUserInfo() {
    this.userName = this._userNameElement;
    this.userDescription = this._userDescriptionElement;
    return (this.userName, this.userDescription)
  };

  setUserInfo({ userName, userDescription }) {
    this._userNameElement.textContent = userName;
    this._userDescriptionElement.textContent = userDescription;
  }
}