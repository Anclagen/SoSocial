import { renderPost } from "../render/post_cards.mjs";

const body = document.querySelector("body");
export const postContent = document.querySelector(".post-specific-content");
const closeModalBtn = document.querySelector(".close-modal-btn");

/**
 * Opens modal for an individual post
 * @param {Object} data a single post object
 */
export function openPostModal(data) {
  if (postData.statusCode >= 400) {
    postContent.innerHTML = `<p class="text-danger h-1">${postData.message}<p>`;
  } else {
    body.classList.add("modal-open");
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
