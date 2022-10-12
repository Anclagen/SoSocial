import { showContainer } from "../../functionality/accordion.mjs";
import { createCommentForm } from "./comment_form.mjs";
import { createReplyTree } from "../../sort_search_filter/reply_tree.mjs";

/**
 * Creates a reply, as well as creating nested replies
 * when used with reply tree data.
 * @param {Array} repliesArray array of reply objects
 * @returns Html to be appended to page.
 */
export function createAReply({ body, owner, created, replies, postId, id }) {
  const replyContainer = document.createElement("div");
  replyContainer.classList = "position-relative";

  //------------- container body ----------------------------
  const replyContentContainer = document.createElement("div");
  replyContentContainer.classList = "bg-tertiary text-white pt-2 reply";
  replyContainer.appendChild(replyContentContainer);

  const replyOwner = document.createElement("a");
  replyOwner.innerText = owner;
  replyOwner.setAttribute("href", `profile.html?profile=${owner}`);
  replyContentContainer.appendChild(replyOwner);

  const replyCreated = document.createElement("p");
  replyCreated.classList = "created-date";
  replyCreated.innerText = `Created: ${new Date(created).toLocaleString()}`;
  replyContentContainer.appendChild(replyCreated);

  const replyBody = document.createElement("p");
  replyBody.classList = "py-1 post-paragraph";
  replyBody.innerText = body;
  replyContentContainer.appendChild(replyBody);

  //reply form
  const postFooterCommentBtn = document.createElement("button");
  postFooterCommentBtn.classList = "btn btn-info ms-auto d-block me-2 mb-2";
  postFooterCommentBtn.setAttribute("type", "button");
  postFooterCommentBtn.innerText = "Comment";
  replyContentContainer.appendChild(postFooterCommentBtn);

  //------------- Comment Form ---------------------------
  const commentFormContainer = document.createElement("div");
  commentFormContainer.classList = "card-body pt-1 pe-3 closing hidden bg-secondary";
  replyContentContainer.appendChild(commentFormContainer);

  postFooterCommentBtn.addEventListener("click", function () {
    showContainer(commentFormContainer);
  });

  commentFormContainer.appendChild(createCommentForm(id, postId));

  //container for replies of the reply.
  const replyToThisContainer = document.createElement("div");
  replyToThisContainer.classList = "replies-container";
  replyContentContainer.appendChild(replyToThisContainer);

  //----------- replies to this comment ------------------
  if (replies) {
    replies.forEach((reply) => {
      replyToThisContainer.append(createAReply(reply));
    });
  }

  return replyContainer;
}

/**
 * Sorts to newest, create reply tree array, all replies to element
 * @param {Array} replyData the replies to a post.
 * @param {Element} container where its all getting rendered
 */
export function renderReplies(replyData, container) {
  //sort by newest
  replyData.sort((a, b) => new Date(b.created) - new Date(a.created));
  const replyTree = createReplyTree(replyData);
  console.log(replyTree);
  replyTree.forEach((reply) => {
    container.append(createAReply(reply));
  });
}
