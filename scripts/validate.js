function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, configObjects) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, configObjects);
  }
  hideInputError(formElement, inputElement, configObjects);
}

function hasInvalidInput(inputList) {
  return inputList.every((inputElement) => inputElement.validity.valid);
}

function disableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function enableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function toggleButtonState(inputList, submitButton, configObjects) {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, configObjects);
  } else {
    enableButton(submitButton, configObjects);
  }
}

function setEventListeners(formElement, configObjects) {
  const { submitButtonSelector } = configObjects;
  const { inputSelector } = configObjects;
  const submitButton = formElement.querySelector(submitButtonSelector);
  const inputList = [...formElement.querySelectorAll(inputSelector)];

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configObjects);
      toggleButtonState(inputList, submitButton, configObjects);
    });
  });
}

function enableValidation(configObjects) {
  const formElements = [
    ...document.querySelectorAll(configObjects.formSelector),
  ];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
    });

    setEventListeners(formElement, configObjects);
  });
}

//pass configObjects to function
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});
