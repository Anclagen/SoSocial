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

let example = `
<div class="card bg-secondary mb-3">
                  <div class="m-3 post-header rounded-3 d-flex">
                    <img class="img-fluid rounded-circle me-2" src="/images/leo_bow_tie_square.jpg" alt="leo's profile picture">
                    <div>
                      <p class="mb-0">You</p>
                      <p class="mb-0">11:44 28/08/22</p>
                    </div>
                    <i class="fa-solid fa-ellipsis-vertical ms-auto fs-2"></i>
                  </div>
                  <div class="bg-tertiary">
                    <p class="p-3 pt-1 m-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac libero ultricies mi dictum finibus porttitor ac orci.Vivamus pellentesque volutpat erat. Vestibulum eget nibh
                      eget justo ornare posuere.
                    </p>
                  </div>
                  <div class="card-body pb-2 pe-3">
                    <div class="d-flex justify-content-end align-items-center fs-5">
                      <i class="fa-solid fa-heart-crack me-1"></i>
                      <span class="me-2">(1)</span>
                      <i class="fa-solid fa-heart me-1"></i>
                      <span class="me-2">(15)</span>
                      <i class="fa-solid fa-share-nodes me-3"></i>
                      <i class="fa-solid fa-comments me-3"></i>
                      <i class="fa-solid fa-comment"></i>
                    </div>
                  </div>
                </div>
`