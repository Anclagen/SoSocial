import { API } from "../../main.mjs";
import { showContainer } from "../../functionality/accordion.mjs";
import { createEditForm } from "./edit_form.mjs";
import { editPost } from "../../api/posts/updatePost.mjs";
import { createPostBody } from "./post_card_body.mjs";
import { createPostFooter } from "./post_card_footer.mjs";
import { createAnErrorMessage } from "../../api/error_reporting.mjs";

export function createOptions(postData, post, rawData) {
  const { modal, reactions, id } = postData;
  const postHeadOptions = document.createElement("div");
  postHeadOptions.classList = "ms-auto";

  //creates options dropdown
  const optionsDropdown = document.createElement("div");
  optionsDropdown.classList = "dropdown";
  postHeadOptions.appendChild(optionsDropdown);

  const optionsDropdownBtn = document.createElement("button");
  optionsDropdownBtn.classList = "btn btn-primary btn-sm dropdown-toggle";
  optionsDropdownBtn.setAttribute("data-bs-toggle", "dropdown");
  optionsDropdownBtn.setAttribute("aria-expanded", "false");
  optionsDropdownBtn.innerText = "Options";
  optionsDropdown.appendChild(optionsDropdownBtn);

  const optionsDropdownMenu = document.createElement("ul");
  optionsDropdownMenu.classList = "dropdown-menu bg-primary";
  optionsDropdown.appendChild(optionsDropdownMenu);

  //edit this post
  const optionsDropdownEdit = document.createElement("li");
  optionsDropdownMenu.appendChild(optionsDropdownEdit);

  const optionsDropdownEditBtn = document.createElement("button");
  optionsDropdownEditBtn.classList = "btn-sm btn btn-info d-block w-100 mb-1";
  optionsDropdownEditBtn.innerText = "Edit";
  optionsDropdownEdit.appendChild(optionsDropdownEditBtn);

  /**
   * show edit form for event listener
   */
  function showEditPostForm() {
    showContainer(editForm);
  }

  optionsDropdownEditBtn.addEventListener("click", showEditPostForm);

  //--------------- edit post form ------------------------
  const errorReportingEdit = document.createElement("div");
  errorReportingEdit.classList = "error text-danger text-center pt-2";
  post.childNodes[0].appendChild(errorReportingEdit);

  const editForm = createEditForm(postData);
  post.childNodes[0].appendChild(editForm);

  /**
   * Edit post form function for event listener
   * @param {Event} submit submits post edits and updated post is successful
   */
  async function editThisPost(submit) {
    try {
      submit.preventDefault();
      const response = await editPost(id, errorReportingEdit, submit.target);
      /**
       * updates post content..
       * @param {Element} post post element to replace
       * @param {Object} response response plus reactions and modal value
       */
      function updatePostContent(post, response) {
        post.childNodes[1].innerHTML = "";
        post.childNodes[1].appendChild(createPostBody(response));
        post.childNodes[2].innerHTML = "";
        post.childNodes[2].append(createPostFooter(response));
      }

      updatePostContent(post, { ...response, reactions, modal });
      // edit post in raw data to show correct info
      const indexInRaw = rawData.findIndex((post) => post.id === id);
      rawData[indexInRaw] = { ...rawData[indexInRaw], ...response };
      //update feed content as well as modal
      if (modal) {
        const feedPost = document.querySelectorAll(`[data-page-post-id="${id}"]`);
        updatePostContent(feedPost[1], { ...response, reactions, modal: false });
      }
      showContainer(editForm);
    } catch (error) {
      console.log(error);
      if (error.message === "response is undefined" || error.message === "title is undefined") {
        errorReportingEdit.append(createAnErrorMessage("This post no longer exists"));
      } else {
        errorReportingEdit.innerHTML = error.message;
      }
    }
  }

  editForm.addEventListener("submit", editThisPost);

  //-------------- Delete this post -------------------------------------
  const optionsDropdownDelete = document.createElement("li");
  optionsDropdownMenu.appendChild(optionsDropdownDelete);

  const optionsDropdownDeleteBtn = document.createElement("button");
  optionsDropdownDeleteBtn.classList = "btn-sm btn btn-danger d-block w-100";
  optionsDropdownDeleteBtn.innerText = "Delete";
  optionsDropdownDelete.appendChild(optionsDropdownDeleteBtn);

  /**
   * Deletes a post, updates modal, feed and raw post data.
   */
  async function deleteThisPost() {
    try {
      const response = await API.deletePost(id);

      if (response.status >= 400) {
        errorReportingEdit.prepend(createAnErrorMessage());
      } else {
        //delete from original data, stops post showing after filtering.
        rawData.splice(
          rawData.findIndex((post) => post.id === id),
          1
        );
        post.innerHTML = "<div class='p-2 text-center'><h3 class='m-0'>Post Deleted</h3></div>";
        if (modal) {
          const feedPost = document.querySelectorAll(`[data-page-post-id="${id}"]`);
          feedPost[1].innerHTML = "<div class='p-2 text-center'><h3 class='m-0'>Post Deleted</h3></div>";
        }
      }
    } catch (error) {
      console.log(error);
      errorReportingEdit.prepend(createAnErrorMessage());
    }
  }

  optionsDropdownDeleteBtn.addEventListener("click", deleteThisPost);

  return postHeadOptions;
}
