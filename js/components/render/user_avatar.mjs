import {isValidImgLink} from "../validation/validation.mjs"

export function createAvatar({avatar, name}){
  let userAvatar = "/images/default-avatar.png";
  if(isValidImgLink(avatar)){
    userAvatar = avatar;
  }
  const user = `<a href="profile.html?profile=${name}" class="d-flex text-white text-decoration-none mb-1">
                  <div class="post-header rounded-3 px-1 d-flex">
                    <img class="img-fluid rounded-circle me-2" src="${userAvatar}" alt="user profile picture" onerror='this.src="images/default-avatar.png"' />
                  <div>
                    <p class="mb-0 fs-5 pt-1">${name}</p>
                  </div>
                </div>
              </a>`
  return user
}