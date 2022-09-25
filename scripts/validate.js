function showInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
};

function enableButton(submitButton) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

function disableButton(submitButton) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const submitButton = [...formElement.querySelectorAll(submitButtonSelector)];
  const inputElements = [...formElement.querySelectorAll(inputSelector)];

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton);
    });
  });
};

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  hideInputError(formElement, inputElement, options);
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputElements, submitButton) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton);
    return;
  };
  enableButton(submitButton);
};

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
    });

    setEventListeners(formElement, options);
    //look for all inputs inside the formElement
    //loop through all the inputs to see if they are all valid
    //if input is not valid
    //grab the validation message
    //add error class to input
    //display error message
    //disable button
    //if all inputs are valid
    //enable button
    //reset error messages
  });
};

enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});