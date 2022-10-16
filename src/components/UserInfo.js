export default class UserInfo {
  constructor({ name, description }) {}

  getUserInfo() {
    // returns object with info about user
    this._userinfo = {};

    return this._userinfo;
  }

  setUserInfo() {
    // takes new user data
    inputName.value = profileName.textContent;
    inputAboutMe.value = profileAboutMe.textContent;
    // adds to page
  }
}
