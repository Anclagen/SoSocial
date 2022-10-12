export function createPostHeader({ author, id, created }) {
  const postHeadContainer = document.createElement("div");
  postHeadContainer.classList = "m-3 post-header rounded-3";
  postHeadContainer.setAttribute("id", id);

  const postHead = document.createElement("div");
  postHead.classList = "d-flex text-white";
  postHeadContainer.appendChild(postHead);

  const profileLink = document.createElement("a");
  profileLink.setAttribute("href", `profile.html?profile=${author.name}`);
  postHead.appendChild(profileLink);

  const avatar = document.createElement("img");
  avatar.src = author.avatar;
  avatar.setAttribute("onerror", `this.src="images/default-avatar.png"`);
  avatar.setAttribute("alt", `Profile image of ${author}`);
  avatar.classList = "img-fluid rounded-circle me-2";
  profileLink.appendChild(avatar);

  const postHeadDetails = document.createElement("div");
  postHead.appendChild(postHeadDetails);

  const postHeadUser = document.createElement("p");
  postHeadUser.innerText = author.name;
  postHeadUser.classList = "mb-0 username";
  postHeadDetails.appendChild(postHeadUser);

  const postHeadTime = document.createElement("p");
  postHeadTime.innerText = new Date(created).toLocaleString();
  postHeadTime.classList = "mb-0 created-date";
  postHeadDetails.appendChild(postHeadTime);

  return postHeadContainer;
}
