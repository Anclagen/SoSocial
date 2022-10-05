import { renderPost } from "../render/post_cards.mjs"

const body = document.querySelector("body");
const postContent = document.querySelector(".post-specific-content");
const closeModalBtn = document.querySelector(".close-modal-btn");

/**
 * Opens modal for an individual post
 * @param {Object} data a single post object 
 */
export function openPostModal(data){
  body.classList.add("modal-open");
  renderPost(data, postContent, true);
  closeModalBtn.addEventListener("click", closePostModal);
}

/**
 * closes post specific modal and clears content.
 */
function closePostModal(){
  body.classList.remove("modal-open");
  postContent.innerHTML = "";
}

