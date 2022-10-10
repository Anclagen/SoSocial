import { API } from "../main.mjs";
import { showContainer } from "../functionality/accordion.mjs";
import { editPost } from "../api/posts/updatePost.mjs";
import { createEditForm } from "./post_card_components/edit_form.mjs";
import { createPostBody } from "./post_card_components/post_card_body.mjs";
import { createPostFooter } from "./post_card_components/post_card_footer.mjs";

/**
 * Takes post data and creates a html for appending to page.
 * Also include listeners for forms, menus and container visibility.
 * @param {Object} postData Post data object
 * @param {boolean} modal if true generates replies.
 * @returns HTML to be appended
 */
export function createAPost({ id, author = API.name, title, body, media, _count, created, updated, tags, reactions, comments }, modal = false) {
  const postData = { id, author, title, body, media, _count, created, updated, tags, reactions, comments, modal };

  const post = document.createElement("div");
  post.classList = "card bg-secondary mb-3";
  post.setAttribute("data-page-post-id", id);

  //------------ post header -----------------

  const postHeadContainer = document.createElement("div");
  postHeadContainer.classList = "m-3 post-header rounded-3";
  postHeadContainer.setAttribute("id", id);
  post.appendChild(postHeadContainer);

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

  //--------------- Edit and Delete Options ------------------------
  // add post edit options you your posts only
  if (author.name === API.name && !modal) {
    const postHeadOptions = document.createElement("div");
    postHeadOptions.classList = "ms-auto";
    postHead.appendChild(postHeadOptions);

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
    postHeadContainer.appendChild(errorReportingEdit);

    const editForm = createEditForm(id, title, body, media, tags);
    postHeadContainer.appendChild(editForm);

    /**
     * Edit post form function for event listener
     * @param {Event} submit submits post edits and updated post is successful
     */
    async function editThisPost(submit) {
      try {
        submit.preventDefault();
        const response = await editPost(id, errorReportingEdit, submit.target);
        postBody.innerHTML = "";
        postBody.appendChild(createPostBody({ ...response, modal: modal }));
        postFooter.innerHTML = "";
        postFooter.append(createPostFooter({ ...response, reactions: reactions, modal: modal }));
        showContainer(editForm);
      } catch (error) {
        console.log(error);
        errorReportingEdit.innerHTML = error.message;
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

    function deleteThisPost() {
      API.deletePost(id);
      post.innerHTML = "<div class='p-2 text-center'><h3 class='m-0'>Post Deleted</h3></div>";
    }

    optionsDropdownDeleteBtn.addEventListener("click", deleteThisPost);
  }

  //------------ post body ---------------------
  const postBody = document.createElement("div");
  postBody.appendChild(createPostBody(postData));
  post.appendChild(postBody);

  //------------ post footer ----------------
  const postFooter = document.createElement("div");
  postFooter.append(createPostFooter(postData, modal));
  post.appendChild(postFooter);

  return post;
}

//--------------- adding posts to the page -----------------

/**
 * renders a single post to a page
 * @param {Object} postData Post data object
 * @param {Element} container element to append Html to
 * @param {Boolean} modal true if displaying in modal
 */
export function renderPost(postData, container, modal) {
  container.append(createAPost(postData, modal));
}

/**
 * renders an array of post objects to an element
 * @param {Object} postsData Post data object
 * @param {Element} container element to append Html to
 */
export function renderPosts(postsData, container) {
  container.innerHTML = "";
  postsData.forEach((post) => container.append(createAPost(post, false)));
}

/**
 * Displays first 25 posts and sets up the scrolling event listener to show more.
 * @param {Array} posts Array of posts
 * @param {Element} container place for posts to be rendered
 */
function limitPostRender(posts, container) {
  //displayed posts and stop boolean for when all results on page or filter change.
  let display = 0;
  let stopRendering = false;

  //only reliable way I found to stop instances of the scroll event listener overlapping when changing filter settings.
  const timeManipulator = document.querySelector("#filter-time");
  const postSorter = document.querySelector("#sort-posts");
  postSorter.addEventListener("change", () => {
    stopRendering = true;
  });
  timeManipulator.addEventListener("change", () => {
    stopRendering = true;
  });

  /**
   * Adds 25 posts to the feed at a time.
   * @param {Array} posts Array of posts.
   * @param {Element} container Element to render html for posts.
   */
  function renderPosts(posts, container) {
    let count = display + 25;
    if (posts.length <= count) {
      count = posts.length;
      stopRendering = true;
    }
    for (let i = display; i < count; i++) {
      container.append(createAPost(posts[i], false));
    }
    display = display + 25;
  }

  //initial run to show first 25 posts
  renderPosts(posts, container);

  /**
   * Function to use in event listener on scroll if the bottom of the page is nearly reached loads more posts if all posts displayed removes the listener.
   */
  function getMorePost() {
    if (stopRendering) {
      //if all post showing or filter changed stops this instance of the listener.
      window.removeEventListener("scroll", getMorePost);
      console.log("Event Lister Removed");
    } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      renderPosts(posts, container);
      window.addEventListener("scroll", getMorePost);
    }
  }

  //sets up scroll listener to load more results
  window.addEventListener("scroll", getMorePost);
}

/**
 * renders an array of post objects to an element
 * @param {Object} postsData Post data object
 * @param {Element} container element to append Html to
 */
export function scrollingRenderPosts(postsData, container, reset) {
  container.innerHTML = "";
  limitPostRender(postsData, container, reset);
}
