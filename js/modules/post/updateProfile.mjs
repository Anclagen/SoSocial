import {showInput} from "../functionality/accordion.mjs"
import {API} from "../main.mjs";
import {renderProfileContent} from "../render/profile_head.mjs";
import {isValidImgLink} from "../validation/validation.mjs"

//------------------- Edit Form -----------------------
const editContainer = document.querySelector("#edit");
const editError = document.querySelector("#edit-error");
const editBtn = document.querySelector("#edit-btn");
const editProfileForm = document.querySelector("#edit-profile-form");

/**
 * Takes the edit form and validates the image links.
 * Then posts updates to users profile images if valid.
 * Takes response to update their profile page details.
 * @param {Event} submit submission of the form
 */
async function updateProfile(submit){
  submit.preventDefault();
  if(!isValidImgLink(editProfileForm.banner.value)){ 
    editError.innerHTML="Invalid Image Link"
  }
  if(!isValidImgLink(editProfileForm.avatar.value)){editError.innerHTML="Invalid Image Link"
  }
  if(isValidImgLink(editProfileForm.avatar.value) && isValidImgLink(editProfileForm.banner.value)){
    editError.innerHTML=""
    const body = JSON.stringify({banner:editProfileForm.banner.value, avatar:editProfileForm.avatar.value});
    const response = await API.updateProfile(body);
    renderProfileContent(response);
    showProfileForm();
  }
}

/**
 * Shows the edit form.
 */
 function showProfileForm(){
  showInput(editProfileForm, 210);
}

export function addEditProfileListeners(){
  editContainer.classList.remove("hidden");
  editBtn.addEventListener("click", showProfileForm);
  editProfileForm.addEventListener("submit", updateProfile);
}