import { enableValidation, settings, disabledButton } from "../scripts/validation.js"
import "./index.css";



const initialCards = [

  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  },


  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"

  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  }];

const cardTemplate = document.querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list")




function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title")
  const cardImageElement = cardElement.querySelector(".card__image");


  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;


  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_active")
  });

  const cardDeleleteBtn = cardElement.querySelector(".card__delete-btn")
  cardDeleleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal)

  });


  return cardElement;
};






const editProfileBtn = document.querySelector(".profile__edit-btn")
const editProfileModal = document.querySelector("#edit-profile-modal")
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn")
const editProfileForm = editProfileModal.querySelector(".modal__form")
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input")
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input")


const newPostModal = document.querySelector("#new-post-modal")
const newPostForm = newPostModal.querySelector(".modal__form")
const newPostBtn = document.querySelector(".profile__add-btn")
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn")
const newPostSaveBtn = newPostModal.querySelector(".modal__save-btn")
const newPostImageLinkInput = newPostModal.querySelector("#card-image-input")
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input")

const profileNameEl = document.querySelector(".profile__name")
const profileDescriptionEl = document.querySelector(".profile__description")

const previewModal = document.querySelector("#preview-modal")
const previewModalCloseBtn = previewModal.querySelector(".modal__close-preview-btn")
const previewImageEl = previewModal.querySelector(".modal__image")
const previewCaptionEl = previewModal.querySelector(".modal__caption")





function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
};

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
};

const handleEscapeKey = (event) => {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};


const handleOverlayClick = (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
};

const allModals = document.querySelectorAll(".modal");
allModals.forEach(modal => {
  modal.addEventListener("click", handleOverlayClick);
});



previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal)
});



editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal)
});


newPostBtn.addEventListener("click", function () {
  openModal(newPostModal)
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal)
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal)
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);



function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    link: newPostImageLinkInput.value,
    name: newPostCaptionInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disabledButton(newPostSaveBtn, settings);
  closeModal(newPostModal);
};

newPostForm.addEventListener('submit', handleNewPostSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

enableValidation(settings);





