import {isValidImgLink} from "../validation/validation.mjs"
import {API} from "../main.mjs";
import {createNewReply} from "../post/createReply.mjs";
import {showContainer, showContainerNoHeight} from "../functionality/accordion.mjs";
import { editPost } from "../post/updatePost.mjs";

export function createAPost({id, author = API.name, title, body, media, _count, created, updated, tags, reactions, comments}){
  const post = document.createElement("div");
  post.classList = "card bg-secondary mb-3";

  //------------ post header -----------------

  const postHeadContainer = document.createElement("div");
  postHeadContainer.classList = "m-3 post-header rounded-3";
  postHeadContainer.setAttribute("id", id)
  post.appendChild(postHeadContainer);

  const postHead = document.createElement("div");
  postHead.classList= "d-flex";
  postHeadContainer.appendChild(postHead);

  const avatar = document.createElement("img");
  if(!isValidImgLink(author.avatar)){
    avatar.src = "images/default-avatar.png";
  } else {
    avatar.src = author.avatar;
  }
  
  avatar.setAttribute("onerror", `this.src="images/default-avatar.png"`);
  avatar.classList = "img-fluid rounded-circle me-2";
  postHead.appendChild(avatar);

  const postHeadDetails = document.createElement("div");
  postHead.appendChild(postHeadDetails);

  const postHeadUser = document.createElement("p");
  postHeadUser.innerText = author.name;
  postHeadUser.classList = "mb-0";
  postHeadDetails.appendChild(postHeadUser);

  const postHeadTime = document.createElement("p");
  postHeadTime.innerText = created;
  postHeadTime.classList = "mb-0";
  postHeadDetails.appendChild(postHeadTime);

  // add post edit options you your posts only
  if(author.name === API.name){
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

    //---- edit form ----
    const errorReportingEdit = document.createElement("div");
    errorReportingEdit.classList = "error text-danger text-center pt-2"
    postHeadContainer.appendChild(errorReportingEdit);

    const editForm = document.createElement("form");
    editForm.setAttribute("data-postID", id);
    editForm.classList = "mx-2 closing hidden";
    postHeadContainer.appendChild(editForm);
    

    const editFormHeading = document.createElement("h3");
    editFormHeading.classList = "pt-2 pb-1"
    editFormHeading.innerText = "Edit Your Post";
    editForm.appendChild(editFormHeading);



    const formBody = document.createElement("div");
    formBody.classList = "d-flex flex-column"
    editForm.appendChild(formBody);

    const titleEditLabel = document.createElement("label");
    titleEditLabel.innerText = "Title";
    titleEditLabel.classList = "text-white ms-2 pt-2";
    titleEditLabel.setAttribute("for", "title");
    formBody.appendChild(titleEditLabel);

    const titleEditInput = document.createElement("input");
    titleEditInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light";
    titleEditInput.setAttribute("name", "title");
    titleEditInput.setAttribute("type", "text");
    titleEditInput.value = title;
    formBody.appendChild(titleEditInput);

    const bodyEditLabel = document.createElement("label");
    bodyEditLabel.innerText = "Body";
    bodyEditLabel.classList = "text-white ms-2 pt-2";
    bodyEditLabel.setAttribute("for", "body");
    formBody.appendChild(bodyEditLabel);

    const bodyEditInput = document.createElement("textarea");
    bodyEditInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light";
    bodyEditInput.setAttribute("name", "body");
    bodyEditInput.setAttribute("type", "text");
    bodyEditInput.value = body;
    formBody.appendChild(bodyEditInput);

    const mediaEditLabel = document.createElement("label");
    mediaEditLabel.innerText = "Image";
    mediaEditLabel.classList = "text-white ms-2 pt-2";
    mediaEditLabel.setAttribute("for", "media");
    formBody.appendChild(mediaEditLabel);

    const mediaEditInput = document.createElement("input");
    mediaEditInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light";
    mediaEditInput.setAttribute("name", "media");
    mediaEditInput.setAttribute("type", "url");
    mediaEditInput.value = media;
    formBody.appendChild(mediaEditInput);

    const tagsEditLabel = document.createElement("label");
    tagsEditLabel.innerText = "Tags";
    tagsEditLabel.classList = "text-white ms-2 pt-2";
    tagsEditLabel.setAttribute("for", "tags");
    formBody.appendChild(tagsEditLabel);

    const tagsEditInput = document.createElement("input");
    tagsEditInput.classList = "form-control rounded-0 border-0 mt-1 bg-tertiary text-white place-text-light";
    tagsEditInput.setAttribute("name", "tags");
    tagsEditInput.setAttribute("type", "text");
    tagsEditInput.value = tags;
    formBody.appendChild(tagsEditInput);

    const submitEditFormBtn = document.createElement("input");
    submitEditFormBtn.classList = "btn btn-success d-block mt-2 ms-auto";
    submitEditFormBtn.value = "Update Post";
    submitEditFormBtn.setAttribute("type", "submit")
    formBody.appendChild(submitEditFormBtn);

    function editThisPost(submit){
      submit.preventDefault();
      if(tagsEditInput.value === ""){
        tagsEditInput.setAttribute("disabled", true);
      }
      if(mediaEditInput.value === ""){
        mediaEditInput.setAttribute("disabled", true);
      }

      editPost(id, errorReportingEdit, submit.target);
      mediaEditInput.removeAttribute("disabled");
      tagsEditInput.removeAttribute("disabled");
    }
    editForm.addEventListener("submit", editThisPost);

    function showEditPostForm(){
      showContainerNoHeight(editForm);
    }

    optionsDropdownEditBtn.addEventListener("click", showEditPostForm);

    //Delete this post
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

    optionsDropdownDeleteBtn.addEventListener("click", deleteThisPost)
  }


  //------------ post body ---------------------
  const postBody = document.createElement("div");
  postBody.classList = "bg-tertiary";
  post.appendChild(postBody);

  const postBodyTitle = document.createElement("h3")
  postBodyTitle.classList = "px-3 py-2";
  postBodyTitle.innerText = title;
  postBody.appendChild(postBodyTitle);

  //if statement here?
  if(media){ //works so far
    const postBodyImg = document.createElement("img");
    postBodyImg.src = media;
    postBodyImg.classList = "px-3 w-100";
    postBodyImg.setAttribute("loading", "lazy");
    postBodyImg.setAttribute("onerror", `this.src="images/404.jpg"`);
    postBody.appendChild(postBodyImg);
  }

  const postBodyContent = document.createElement("p")
  postBodyContent.classList = "px-3 pb-2";
  postBodyContent.innerText = body;
  postBody.appendChild(postBodyContent);

  if(updated !== created){
    const updatedDate = document.createElement("div");
    updatedDate.innerText = `Updated: ${updated}`;
    updatedDate.classList = "text-right px-3 pb-1 ms-auto ";
    postBody.appendChild(updatedDate);
  }
  
  //------------ post footer ----------------
  const postFooter = document.createElement("div");
  postFooter.classList = "card-body pb-2 pe-3"
  post.appendChild(postFooter);

  //change this!!!!!
  const statsContainer = document.createElement("div");
  statsContainer.classList = "p-2 d-flex"
  postFooter.appendChild(statsContainer);

  const tagsContainer = document.createElement("div");
  statsContainer.appendChild(tagsContainer);

  const postFooterTags = document.createElement("span");
  postFooterTags.innerText = tags;
  tagsContainer.appendChild(postFooterTags);

  const commentCounterContainer = document.createElement("div");
  commentCounterContainer.classList = "px-2"
  statsContainer.appendChild(commentCounterContainer);

  const postFooterCommentCount = document.createElement("span");
  postFooterTags.innerText = `Comments: ${_count.comments}`;
  commentCounterContainer.appendChild(postFooterCommentCount);

  const reactionCounterContainer = document.createElement("div");
  statsContainer.appendChild(reactionCounterContainer);

  const postFooterReactCount = document.createElement("span");
  postFooterReactCount.innerText = `Reactions: ${_count.reactions}`;
  reactionCounterContainer.appendChild(postFooterReactCount);


  const postFooterCommentBtn = document.createElement("button");
  postFooterCommentBtn.classList = "btn btn-info ms-auto d-block";
  postFooterCommentBtn.setAttribute("type", "button");
  postFooterCommentBtn.innerText = "Comment";
  postFooter.appendChild(postFooterCommentBtn)
  

  //------------ Comment Form -----------------
  const commentFormContainer = document.createElement("div");
  commentFormContainer.classList = "card-body pt-0 pe-3 closing hidden"
  post.appendChild(commentFormContainer);

  postFooterCommentBtn.addEventListener("click", function(){showContainerNoHeight(commentFormContainer)} )

  const commentForm = document.createElement("form");
  commentForm.setAttribute("data-postID", id);
  commentForm.classList = "mx-2";
  commentFormContainer.appendChild(commentForm);
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

  if(comments.length > 0){

  }

  return post
}

export function createReply(data){

}

export function renderPost(postData, container) {
  container.append(createAPost(postData))
}

export function renderPosts(postsData, container) {
  container.innerHTML= "";
  container.append(...postsData.map(createAPost))
}
