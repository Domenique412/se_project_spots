import "core-js";
import { enableValidation, settings, disabledButton } from "../scripts/validation.js"
import "./index.css";
import Api from "../utils/Api.js";


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0cc6e233-7e47-4b6a-bd0f-16c6c5e3b7a1",
    "Content-Type": "application/json"
  }
});



let selectedCard;
let selectedCardId;

api.getAppInfo()
  .then(([cards, info]) => {
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    profileNameEl.textContent = info.name;
    profileDescriptionEl.textContent = info.about;

  })
  .catch((err) => {
    console.error(err);
  });



const cardTemplate = document.querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list")






function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api.removeCard(selectedCardId)

    .then(() => {
      closeModal(deleteModal)
    })
    .catch(console.error);
}


function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  console.log(data)
  openModal(deleteModal);
}

function handleLike(evt, id) {
  evt.target.classList.toggle("card__like-btn_active");
  //check whether card is currently liked or not
  // const isLiked ==????
  // cal the changeLikeStatus method, passing the right arguments
  // handle the response (.then .catch)
  // in .then toggle active class
}




function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title")
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  // if card is liked set active on the class


  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;




  cardLikeBtn.addEventListener("click", (evt) => {
    handleLike(evt, data._id)
  });



  cardDeleteBtn.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data)
  );

  cardImageElement.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal)

  });


  return cardElement;
};



const profileAvatarEl = document.querySelector(".profile__avatar")
const profileAvatarBtn = document.querySelector(".profile__avatar-btn")
const profileAvatarModal = document.querySelector("#edit-avatar-modal")
const profileAvatarCloseBtn = profileAvatarModal.querySelector(".modal__close-btn")
const profileAvatarForm = profileAvatarModal.querySelector(".modal__form")
const profileAvatarLinkInput = profileAvatarModal.querySelector("#profile-avatar-image-input")

const editProfileBtn = document.querySelector(".profile__edit-btn")
const editProfileModal = document.querySelector("#edit-profile-modal")
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn")
const editProfileForm = editProfileModal.querySelector(".modal__form")
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input")
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input")


const deleteModal = document.querySelector("#delete-modal")
const deleteModalCancelBtn = deleteModal.querySelector(".modal__cancel-btn")
const deleteCardBtn = document.querySelector(".modal__delete-btn")
const deleteForm = deleteModal.querySelector(".modal__form")
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn")

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

profileAvatarBtn.addEventListener("click", function () {
  openModal(profileAvatarModal)
});

profileAvatarCloseBtn.addEventListener("click", function () {
  closeModal(profileAvatarModal)
});

deleteModalCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal)
});

deleteModalCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal)
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
  // change text content to saving
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api.editUserInfo({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value
  })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;

    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      // call set button setButtonText instead
      submitBtn.textContent = "Save";
    })

  closeModal(editProfileModal)
}
// implement loading text for all other form submissions

editProfileForm.addEventListener("submit", handleEditProfileSubmit);


function handleProfileAvatarSubmit(evt) {
  evt.preventDefault();
  api.editUserAvatar(profileAvatarLinkInput.value)
    .then((data) => {
      profileAvatarEl.src = data.avatar;
    })
    .catch((err) => {
      console.error(err);
    });

  closeModal(profileAvatarModal)
}
profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);



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

newPostForm.addEventListener("submit", handleNewPostSubmit);


enableValidation(settings);





