const profileBanner = document.querySelector("#profileBanner");
const profileImage = document.querySelector("#profileImage");
const heading = document.querySelector("h1");
const editProfileForm = document.querySelector("#edit-profile-form");
/**
 * Fills in page content with user info.
 * @param {Object} UserData
 */
export function renderProfileContent({ banner, avatar, name, meta = "" }) {
  if (banner != null) {
    profileBanner.src = banner;
    editProfileForm.banner.value = banner;
  }

  if (banner != null) {
    profileImage.src = avatar;
    editProfileForm.avatar.value = avatar;
  }

  heading.innerText = name;
  //updates the edit inputs
}
