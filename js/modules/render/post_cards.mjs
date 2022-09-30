import {isValidImgLink} from "../validation/validation.mjs"
import {API} from "../main.mjs";
import {createNewReply} from "../post/createReply.mjs";
import {showContainer} from "../functionality/accordion.mjs";

export function createAPost({id, author, title, body, media, _count, created, updated, tags, reactions, comments}){
  const post = document.createElement("div");
  post.classList = "card bg-secondary mb-3";

  //------------ post header -----------------
  const postHead = document.createElement("div");
  postHead.classList = "m-3 post-header rounded-3 d-flex";
  post.appendChild(postHead);

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

    const optionsDropdownEdit = document.createElement("li");
    optionsDropdownMenu.appendChild(optionsDropdownEdit);

    const optionsDropdownEditBtn = document.createElement("button");
    optionsDropdownEditBtn.classList= "btn-sm btn btn-info d-block w-100 mb-1";
    optionsDropdownEditBtn.innerText = "Edit";
    optionsDropdownEdit.appendChild(optionsDropdownEditBtn);


    const optionsDropdownDelete = document.createElement("li");
    optionsDropdownMenu.appendChild(optionsDropdownDelete);

    const optionsDropdownDeleteBtn = document.createElement("button");
    optionsDropdownDeleteBtn.classList= "btn-sm btn btn-danger d-block w-100";
    optionsDropdownDeleteBtn.innerText = "Delete";
    optionsDropdownDelete.appendChild(optionsDropdownDeleteBtn);



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

  postFooterCommentBtn.addEventListener("click", function(){showContainer(commentFormContainer, 229)} )

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

  const commentSubmit = document.createElement("button");
  commentSubmit.classList = "btn btn-success d-block mt-2 ms-auto"
  commentSubmit.innerText = "Post A Comment";
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
  container.append(...postsData.map(createAPost))
}
