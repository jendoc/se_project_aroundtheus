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

function checkInputValidity(formElement, inputElement, configObject) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, configObject);
  } else {
    hideInputError(formElement, inputElement, configObject);
  }
}

function hasInvalidInput(inputList) {
  console.log(inputList);
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function disableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputList, submitButton, configObject) {
  if (hasInvalidInput(inputList)) {
    disableButton(submitButton, configObject);
  } else {
    enableButton(submitButton, configObject);
  }
}

function setEventListeners(formElement, configObject) {
  const { submitButtonSelector } = configObject;
  const { inputSelector } = configObject;
  const submitButton = formElement.querySelector(submitButtonSelector);
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  toggleButtonState(inputList, submitButton, configObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configObject);
      toggleButtonState(inputList, submitButton, configObject);
    });
  });
}

function enableValidation(configObject) {
  const formElements = [
    ...document.querySelectorAll(configObject.formSelector),
  ];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault;
    });

    setEventListeners(formElement, configObject);
  });
}

//pass configObject to function
enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
});