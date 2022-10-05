import {createNewReply} from "../api/posts/createReply.mjs";

/**
 * Creates a reply form for posts and replies
 * @param {Number} id of parent post/reply 
 * @param {Number} parentId Id of primary post for fetch request
 * @returns {HTML} returns a form to be appended to a container.
 */
export function createCommentForm(id, parentId = ""){
  const commentForm = document.createElement("form");
  commentForm.setAttribute("data-postID", id);
  if(parentId){
    commentForm.setAttribute("data-parentID", parentId);
  }
  commentForm.classList = "mx-2";
  commentForm.addEventListener("submit", createNewReply)

  const commentBodyLabel = document.createElement("label");
  commentBodyLabel.classList = "text-white ms-2";
  commentBodyLabel.setAttribute("for", "body");
  commentBodyLabel.innerText = "Post A Comment";
  commentForm.appendChild(commentBodyLabel);

  const commentInput = document.createElement("textarea");
  commentInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light"
  commentInput.setAttribute("name", "body");
  commentInput.setAttribute("rows", "3");
  commentInput.setAttribute("required", "");
  commentForm.appendChild(commentInput);

  const commentSubmit = document.createElement("input");
  commentSubmit.classList = "btn btn-success d-block mt-2 ms-auto"
  commentSubmit.value = "Post A Comment";
  commentSubmit.setAttribute("type", "submit");
  commentForm.appendChild(commentSubmit);

  return commentForm
}