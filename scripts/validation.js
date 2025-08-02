const checkInputValidity = (formEl, inputEl) => {
  console.log(inputEl.validationMessage);
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  }

};


const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__save-btn");

  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl);
      //toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.foreach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
