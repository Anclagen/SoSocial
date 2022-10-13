import { createReactionButtons } from "./react_buttons.mjs";
import { createCommentForm } from "./comment_form.mjs";
import { renderReplies } from "./post_replies.mjs";
import { showContainer } from "../../functionality/accordion.mjs";

/**
 * Creates the footer of a post, as well as comment form and section.
 * @param {Object} postData an object containing a specific posts data
 * @returns HTML for the footer of a post to be appended
 */
export function createPostFooter({ id, tags, _count, comments, reactions, modal }) {
  //------------ post footer ----------------

  //createPostFooter(postData, post);

  const postFooter = document.createElement("div");
  postFooter.classList = "card-body pb-2 pe-3";

  const tagsContainer = document.createElement("div");
  postFooter.appendChild(tagsContainer);

  const postFooterTags = document.createElement("span");
  if (tags.length === 0 || tags[0] === "") {
    postFooterTags.innerText = "Tags: None";
  } else {
    postFooterTags.innerText = "Tags: " + tags.join(", ");
  }
  tagsContainer.appendChild(postFooterTags);
  const statsContainer = document.createElement("div");
  statsContainer.classList = "";
  postFooter.appendChild(statsContainer);

  const commentCounterContainer = document.createElement("div");
  commentCounterContainer.classList = "pe-2 pt-1";
  statsContainer.appendChild(commentCounterContainer);

  const postFooterCommentCount = document.createElement("span");
  postFooterCommentCount.innerText = `Comments: ${_count.comments}`;
  commentCounterContainer.appendChild(postFooterCommentCount);

  //----------------- Like/Dislike Reactions ---------------------

  statsContainer.appendChild(createReactionButtons(id, reactions));

  //----------------- Comment Form ---------------------
  const postFooterCommentBtn = document.createElement("button");
  postFooterCommentBtn.classList = "btn btn-info ms-auto d-block mt-2";
  postFooterCommentBtn.setAttribute("type", "button");
  postFooterCommentBtn.innerText = "Comment";
  postFooter.appendChild(postFooterCommentBtn);

  const commentFormContainer = document.createElement("div");
  commentFormContainer.classList = "card-body pt-0 pe-3 closing hidden";
  postFooter.appendChild(commentFormContainer);

  postFooterCommentBtn.addEventListener("click", function () {
    //stop multiple forms being produced
    if (commentFormContainer.innerHTML === "") {
      commentFormContainer.appendChild(createCommentForm(id));
    }
    showContainer(commentFormContainer);
  });

  const commentsContainer = document.createElement("div");
  commentsContainer.classList = "replies-container bg-tertiary";
  postFooter.appendChild(commentsContainer);

  //--------------------- replies -----------------------
  if (modal) {
    if (comments) {
      renderReplies(comments, commentsContainer);
    }
  }

  return postFooter;
}
