import { API } from "../../main.mjs";
import { openPostModal } from "../../functionality/modal.mjs";

/**
 * creates the body for a post
 * @param {Object} postData an object containing a specific posts data
 * @returns HTML element to be appended to the page
 */
export function createPostBody({ id, title, body, media, updated, created, modal }) {
  if (title.trim() === "") {
    title = "Untitled";
  }

  const postBody = document.createElement("div");
  postBody.classList = "bg-tertiary post-body text-white";

  /**
   * gets post data opens modal and renders, for event listener
   */
  async function openModal() {
    try {
      const postData = await API.getPost(id);
      openPostModal(postData);
    } catch (error) {
      console.log(error);
    }
  }

  // if in modal remove listener to body
  if (!modal) {
    postBody.addEventListener("click", openModal);
  }

  const postBodyTitle = document.createElement("h3");
  postBodyTitle.classList = "px-3 py-2";
  postBodyTitle.innerText = title;
  postBody.appendChild(postBodyTitle);

  const postBodyImg = document.createElement("img");
  postBodyImg.src = media;
  postBodyImg.classList = "px-3 w-100 pb-2 post-image";
  postBodyImg.setAttribute("loading", "lazy");
  postBodyImg.setAttribute("alt", title);
  postBodyImg.setAttribute("onerror", `this.src="images/404.jpg"`);
  if (media) {
    postBody.appendChild(postBodyImg);
  }

  const postBodyContent = document.createElement("p");
  postBodyContent.classList = "px-3 pb-2";
  postBodyContent.innerText = body;
  postBody.appendChild(postBodyContent);

  const updatedDate = document.createElement("div");
  postBody.appendChild(updatedDate);
  if (updated !== created) {
    updatedDate.innerText = `Updated: ${new Date(updated).toLocaleString()}`;
    updatedDate.classList = "text-right px-3 pb-1 ms-auto updated-date";
  }

  return postBody;
}
