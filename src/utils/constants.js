// export const initialCards = [
//   {
//     title: "Grand Prismatic Spring",
//     link: "https://images.unsplash.com/photo-1533419784160-1f7f79022119?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80",
//   },
//   {
//     title: "Thor's Well",
//     link: "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80",
//   },
//   {
//     title: "Multnomah Falls",
//     link: "https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
//   },
//   {
//     title: "Lake Tahoe",
//     link: "https://images.unsplash.com/photo-1548954042-c23fc6226ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
//   },
//   {
//     title: "Antelope Canyon",
//     link: "https://images.unsplash.com/photo-1602088693260-78f2c76287c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//   },
//   {
//     title: "Cape Elizabeth",
//     link: "https://images.unsplash.com/photo-1520450202524-87e5dd06a74b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
//   },
// ];

export const validationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const selectors = {
  cardList: ".gallery__grid",
  cardTemplate: "#card-template",
  // Popups
  previewPopup: "image-modal",
  editPopup: "edit-modal",
  addPopup: "add-modal",
  // Forms
  addForm: ".modal__form_add",
  editForm: ".modal__form_edit",
  // Profile Elements
  userName: ".profile__name",
  userAboutMe: ".profile__description",
  // Buttons
  closeButtons: "modal__close-button",
  editProfileButton: ".profile__edit-button",
  addCardButton: ".profile__add-button",
};