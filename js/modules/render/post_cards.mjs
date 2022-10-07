import {API} from "../main.mjs";
import { createCommentForm } from "./comment_form.mjs";
import {showContainerNoHeight} from "../functionality/accordion.mjs";
import {editPost} from "../api/posts/updatePost.mjs";
import { openPostModal} from "../functionality/modal.mjs";
import { renderReplies} from "./post_replies.mjs";
import { createEditForm } from "./edit_form.mjs";

/**
 * Takes post data and creates a html for appending to page.
 * Also include listeners for forms, menus and container visibility.
 * @param {Object} postData Post data object
 * @param {boolean} modal if true generates replies.
 * @returns HTML to be appended
 */
export function createAPost({id, author = API.name, title, body, media, _count, created, updated, tags, reactions, comments}, modal = false){
  if(title.trim() === ""){
    title = "Untitled";
  }

  const post = document.createElement("div");
  post.classList = "card bg-secondary mb-3";

  //------------ post header -----------------

  const postHeadContainer = document.createElement("div");
  postHeadContainer.classList = "m-3 post-header rounded-3";
  postHeadContainer.setAttribute("id", id)
  post.appendChild(postHeadContainer);

  const postHead = document.createElement("div");
  postHead.classList= "d-flex text-white";
  postHeadContainer.appendChild(postHead);

  const profileLink = document.createElement("a");
  profileLink.setAttribute("href", `profile.html?profile=${author.name}`)
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
  if(author.name === API.name && !modal){
    const postHeadOptions = document.createElement("div");
    postHeadOptions.classList="ms-auto";
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
    optionsDropdownEditBtn.classList= "btn-sm btn btn-info d-block w-100 mb-1";
    optionsDropdownEditBtn.innerText = "Edit";
    optionsDropdownEdit.appendChild(optionsDropdownEditBtn);   
    
    /**
     * show edit form for event listener
     */
    function showEditPostForm(){
      showContainerNoHeight(editForm);
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
    async function editThisPost(submit){
      try{
        submit.preventDefault();
        const response = await editPost(id, errorReportingEdit, submit.target);
        postBodyTitle.innerText = response.title;
        postBodyContent.innerText = response.body;
        postFooterTags.innerText = response.tags;
        updatedDate.innerText = `Updated: ${new Date(response.updated).toLocaleString()}`;
        updatedDate.classList = "text-right px-3 pb-1 ms-auto ";
        if(media){
          postBodyImg.src = response.media;
        } else if(response.media){
          postBodyImg.src = response.media;
          postBody.appendChild(postBodyImg);
        }
        showContainerNoHeight(editForm);
      } catch(error){
        console.log(error);
      }
    }

    editForm.addEventListener("submit", editThisPost);

    //-------------- Delete this post -------------------------------------
    const optionsDropdownDelete = document.createElement("li");
    optionsDropdownMenu.appendChild(optionsDropdownDelete);

    const optionsDropdownDeleteBtn = document.createElement("button");
    optionsDropdownDeleteBtn.classList= "btn-sm btn btn-danger d-block w-100";
    optionsDropdownDeleteBtn.innerText = "Delete";
    optionsDropdownDelete.appendChild(optionsDropdownDeleteBtn);

    function deleteThisPost(){
      API.deletePost(id);
      post.innerHTML = "<div class='p-2 text-center'><h3 class='m-0'>Post Deleted</h3></div>";
    }

    optionsDropdownDeleteBtn.addEventListener("click", deleteThisPost);
  }

  //------------ post body ---------------------
  const postBody = document.createElement("div");
  postBody.classList = "bg-tertiary post-body text-white";
  post.appendChild(postBody);

  /**
   * gets post data opens modal and renders, for event listener
   */
  async function openModal(){
    try{
      const postData = await API.getPost(id);
      openPostModal(postData); 
    } catch(error){
      console.log(error);
    }
  };

  // if in modal remove listener to body
  if(!modal){
    postBody.addEventListener("click", openModal);
  }
  
  const postBodyTitle = document.createElement("h3")
  postBodyTitle.classList = "px-3 py-2";
  postBodyTitle.innerText = title;
  postBody.appendChild(postBodyTitle);

  const postBodyImg = document.createElement("img");
  postBodyImg.src = media;
  postBodyImg.classList = "px-3 w-100 pb-2 post-image";
  postBodyImg.setAttribute("loading", "lazy");
  postBodyImg.setAttribute("alt", title);
  postBodyImg.setAttribute("onerror", `this.src="images/404.jpg"`);
  if(media){
    postBody.appendChild(postBodyImg);
  }

  const postBodyContent = document.createElement("p")
  postBodyContent.classList = "px-3 pb-2";
  postBodyContent.innerText = body;
  postBody.appendChild(postBodyContent);

  const updatedDate = document.createElement("div");
  postBody.appendChild(updatedDate);
  if(updated !== created){
    updatedDate.innerText = `Updated: ${new Date(updated).toLocaleString()}`;
    updatedDate.classList = "text-right px-3 pb-1 ms-auto updated-date";
  }
  
  //------------ post footer ----------------
  const postFooter = document.createElement("div");
  postFooter.classList = "card-body pb-2 pe-3";
  post.appendChild(postFooter);

  const tagsContainer = document.createElement("div");
  postFooter.appendChild(tagsContainer);

  const postFooterTags = document.createElement("span");
  if(tags.length === 0 || tags[0] === ""){
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
  const reactionCounterContainer = document.createElement("div");
  reactionCounterContainer.classList = "pt-1";
  statsContainer.appendChild(reactionCounterContainer);
  
  let likes = 0;
  let dislikes = 0;
  if(reactions.length > 0){
    reactions.forEach((entry) => {
      if(entry.symbol.includes("👍")){
        likes = entry.count;
      }
      if(entry.symbol.includes("👎")){
        dislikes = entry.count;
      }
    })
  }

  const likeReactBtn = document.createElement("button");
  likeReactBtn.classList = "p-1 btn bg-tertiary border-rounded text-white";
  likeReactBtn.innerText = `Likes: 👍 (${likes})`;
  likeReactBtn.setAttribute("type", "button");
  reactionCounterContainer.appendChild(likeReactBtn);
  

  async function likePost(){
    const response = await API.likePost(id);
    likeReactBtn.innerText = `Likes: 👍 (${response.count})`;
  }

  likeReactBtn.addEventListener("click", likePost);

  const dislikeReactBtn = document.createElement("button");
  dislikeReactBtn.classList = "p-1 ms-2 btn bg-tertiary border-rounded text-white";
  dislikeReactBtn.innerText = `Dislikes: 👎 (${dislikes})`;
  dislikeReactBtn.setAttribute("type", "button");
  reactionCounterContainer.appendChild(dislikeReactBtn);

  async function dislikePost(){
    const response = await API.dislikePost(id);
    dislikeReactBtn.innerText = `Dislikes: 👎 (${response.count})`;
  }

  dislikeReactBtn.addEventListener("click", dislikePost);

  const postFooterCommentBtn = document.createElement("button");
  postFooterCommentBtn.classList = "btn btn-info ms-auto d-block mt-2";
  postFooterCommentBtn.setAttribute("type", "button");
  postFooterCommentBtn.innerText = "Comment";
  postFooter.appendChild(postFooterCommentBtn);
  
  //----------------- Comment Form ---------------------
  const commentFormContainer = document.createElement("div");
  commentFormContainer.classList = "card-body pt-0 pe-3 closing hidden";
  post.appendChild(commentFormContainer);

  postFooterCommentBtn.addEventListener("click", function(){
    //stop multiple forms being produced
    if(commentFormContainer.innerHTML=== ""){
      commentFormContainer.appendChild(createCommentForm(id));
    }
    showContainerNoHeight(commentFormContainer);
  })

  const commentsContainer = document.createElement("div");
  commentsContainer.classList = "replies-container bg-tertiary";
  post.appendChild(commentsContainer);

  //--------------------- replies -----------------------
  if(modal){
    if(comments){
      renderReplies(comments, commentsContainer);
    }
  }

  return post;
}

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
  container.innerHTML= "";
  postsData.forEach((post) => container.append(createAPost(post, false)));
}



function limitPostRender(posts, container){
  let display = 0;
  let stopRendering = false;
  function renderPosts(posts, container){
    let count = display + 25;
    if(posts.length <= count){
      count = posts.length;
      stopRendering = true;
    }
    for(let i = display; i < count; i++){
      container.append(createAPost(posts[i], false))
    }
    display = display + 25;
  }

  renderPosts(posts, container);

  function getMorePost(){
      if(stopRendering){ 
        this.removeEventListener("scroll", getMorePost);
        console.log("done!");
      } else if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500){
        console.log(display);
        renderPosts(posts, container);
      }
    }

  window.addEventListener("scroll", getMorePost);
}

/**
 * renders an array of post objects to an element
 * @param {Object} postsData Post data object
 * @param {Element} container element to append Html to
 */
 export function scrollingRenderPosts(postsData, container) {
  container.innerHTML= "";
  limitPostRender(postsData, container);
  
}

