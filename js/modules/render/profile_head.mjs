const profileBanner = document.querySelector("#profileBanner");
const profileImage = document.querySelector("#profileImage");
const heading = document.querySelector("h1");
const editProfileForm = document.querySelector("#edit-profile-form");
/**
 * Fills in page content with user info.
 * @param {Object} UserData
 */
export function renderProfileContent({ banner, avatar, name, meta = "" }) {
  profileBanner.src = banner;
  profileImage.src = avatar;
  heading.innerText = name;

  //updates the edit inputs
  editProfileForm.banner.value = banner;
  editProfileForm.avatar.value = avatar;
}
