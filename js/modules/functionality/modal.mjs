import { renderPost } from "../render/post_cards.mjs";
import { addLoader } from "../render/loader.mjs";

const body = document.querySelector("body");
export const postContent = document.querySelector(".post-specific-content");
const closeModalBtn = document.querySelector(".close-modal-btn");

/**
 * Opens modal for an individual post
 * @param {Object} data a single post object
 */
export function openPostModal(data) {
  body.classList.add("modal-open");
  addLoader(postContent);
  if (data.statusCode >= 400) {
    postContent.innerHTML = `<p class="text-danger h-1 bg-white text-center">${data.message}<p>`;
  } else {
    postContent.innerHTML = "";
    renderPost(data, postContent, true);
    closeModalBtn.addEventListener("click", closePostModal);
  }
}

/**
 * closes post specific modal and clears content.
 */
function closePostModal() {
  body.classList.remove("modal-open");
  postContent.innerHTML = "";
}
