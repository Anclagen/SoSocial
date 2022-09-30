import {isValidImgLink} from "../validation/validation.mjs"

export function createBasicPost(data){
  const post = document.createElement("div");
  post.classList = "card bg-secondary mb-3";

  const postHead = document.createElement("div");
  postHead.classList = "m-3 post-header rounded-3 d-flex";
  post.appendChild(postHead);

  const avatar = document.createElement("img");
  if(!isValidImgLink(data.author.avatar)){
    avatar.src = "images/default-avatar.png";
  } else {
    avatar.src = data.author.avatar;
  }
  
  avatar.setAttribute("onerror", `this.src="images/default-avatar.png"`);
  avatar.classList = "img-fluid rounded-circle me-2";
  postHead.appendChild(avatar);

  const postHeadDetails = document.createElement("div");
  postHead.appendChild(postHeadDetails);

  const postHeadUser = document.createElement("p");
  postHeadUser.innerText = data.author.name;
  postHeadUser.classList = "mb-0";
  postHeadDetails.appendChild(postHeadUser);

  const postHeadTime = document.createElement("p");
  postHeadTime.innerText = data.created;
  postHeadTime.classList = "mb-0";
  postHeadDetails.appendChild(postHeadTime);

  const postBody = document.createElement("div");
  postBody.classList = "bg-tertiary";
  post.appendChild(postBody);

  const postBodyTitle = document.createElement("h3")
  postBodyTitle.classList = "px-3 py-2";
  postBodyTitle.innerText = data.title;
  postBody.appendChild(postBodyTitle);

  //if statement here?
  if(isValidImgLink(data.media)){ //works so far
    const postBodyImg = document.createElement("img");
    postBodyImg.src = data.media;
    postBodyImg.classList = "px-3 w-100";
    postBodyImg.setAttribute("loading", "lazy");
    postBodyImg.setAttribute("onerror", `this.src="images/404.jpg"`);
    postBody.appendChild(postBodyImg);
  }

  const postBodyContent = document.createElement("p")
  postBodyContent.classList = "px-3 pb-2";
  postBodyContent.innerText = data.body;
  postBody.appendChild(postBodyContent);
  
  const postFooter = document.createElement("div");
  postFooter.classList = "card-body pb-2 pe-3"
  post.appendChild(postFooter);

  //change this
  const postFooterTags = document.createElement("span");
  postFooterTags.innerText = data.tags;
  postFooter.appendChild(postFooterTags);

  return post
}

export function renderPost(postData, container) {
  container.append(createBasicPost(postData))
}

export function renderPosts(postsData, container) {
  container.append(...postsData.map(createBasicPost))
}

//messing around with template
export function createAPost(data){
  const postClone = document.importNode(postTemplate, true).content;
  postClone.querySelector(".userName").innerText = data.author.name;
  postClone.querySelector(".userAvatar").src = data.author.avatar;
  postClone.querySelector(".postTitle").innerText = data.title;
  postClone.querySelector(".postBody").innerText = data.body; 
  if(isValidImgLink(data.media)){ //works so far
    const postBodyImg = document.createElement("img");
    postBodyImg.src = data.media;
    postBodyImg.classList = "px-3 w-100";
    postBodyImg.setAttribute("loading", "lazy");
    postBodyImg.setAttribute("onerror", `this.src="images/404.jpg"`);
    postClone.querySelector(".postImage").appendChild(postBodyImg);
  }
  return postClone
}