export default class UserInfo {
  constructor({ name, description }) {}

  getUserInfo() {
    this._userinfo = {};

    return this._userinfo;
  }

  setUserInfo() {
    this._userinfo = this.getUserInfo();

    this._userInfo.name.value = profileName.textContent;
    this._userInfo.description.value = profileAboutMe.textContent;
    // adds to page
  }
}
