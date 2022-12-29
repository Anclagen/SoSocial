import { isValidImgLink } from "../validation/validation.mjs";

/**
 * creates html for user avatar.
 * @param {Object} userData takes user data and creates avatar html
 * @returns {Element} html element returned with users avatar and name
 */
export function createAvatar({ avatar, name }) {
  const user = `<a href="profile.html?profile=${name}" class="d-flex text-white text-decoration-none mb-1">
                  <div class="post-header rounded-3 pe-1 d-flex">
                    <img class="img-fluid rounded-circle me-2" src="${avatar}" alt="user profile picture" onerror='this.src="images/default-avatar.png"' />
                  <div>
                    <p class="mb-0 fs-5 pt-1 follower-names">${name}</p>
                  </div>
                </div>
              </a>`;
  return user;
}
