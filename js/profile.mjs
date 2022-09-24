import {initialiseAPIHandler, createBasicPost, showInput, postComment, newPost, isValidImgLink, createAvatar} from "./components/main.mjs"
const API = initialiseAPIHandler();
//page grabs
//users banner, avatar and name
const profileBanner = document.querySelector("#profileBanner");
const profileImage = document.querySelector("#profileImage");
const heading = document.querySelector("h1");
//post comment form
const postsContainer = document.querySelector("#post-feed");
const postCommentSection = document.querySelector("#post-comment");
const postCommentForm = document.querySelector("#post-comment-form");
const imageBtn = document.querySelector("#img-btn");
const imageContainer = document.querySelector("#image-container");
const tagsBtn = document.querySelector("#tags-btn");
const tagsContainer = document.querySelector("#tags-container");
//edit user details form
const aboutContainer = document.querySelector("#about");
const editContainer = document.querySelector("#edit");
const editError = document.querySelector("#edit-error");
const editBtn = document.querySelector("#edit-btn");
const editProfileForm = document.querySelector("#edit-profile-form");
const avatarInput = document.querySelector("#avatar");
const bannerInput = document.querySelector("#banner");
//followers
const followersContainer = document.querySelector("#followers");
const followingContainer = document.querySelector("#following");
const followContainer = document.querySelector("#follow-user");
const followBtn = document.querySelector("#follow-btn");



/**
 * Checks if a query string is present to define a user.
 * @param {Class} API insert defined handleAPI class into this.
 * @returns {String} Username returned for fetch request.
 */
function defineUser(API){
  let user = API.name;
  const qstring = new URLSearchParams(window.location.search);
  if(qstring.has("profile")){
    user = qstring.get("profile");
  } 
  return user
}

const user = defineUser(API);

function showProfileForm(){
  showInput(editProfileForm, 210);
  //editBtn.classList.add("hidden");
}

async function updateProfile(submit){
  submit.preventDefault();
  if(!isValidImgLink(bannerInput.value)){ editError.innerHTML="Invalid Image Link"}
  if(!isValidImgLink(avatarInput.value)){ editError.innerHTML="Invalid Image Link"}
  if(isValidImgLink(avatarInput.value) && isValidImgLink(bannerInput.value)){
    editError.innerHTML=""
    const body = JSON.stringify({banner:bannerInput.value, avatar:avatarInput.value});
    const response = await API.updateProfile(body);
    renderProfileContent(response);
    showProfileForm();
  }
}

/**
 * Checks profile data matches logged in user to enable profile editing.
 * @param {Object} UserData a single profile object.
 */
async function isUsersProfile({name, avatar, banner, followers}, API){
  if(API.name === name){
    editContainer.classList.remove("hidden");
    editBtn.addEventListener("click", showProfileForm);
    bannerInput.value = banner;
    avatarInput.value = avatar;
    editProfileForm.addEventListener("submit", updateProfile)
    followContainer.classList.add("hidden")
    postCommentSection.classList.remove("hidden");
    imageBtn.addEventListener("click", function(){showInput(imageContainer, 84)});
    tagsBtn.addEventListener("click", function(){showInput(tagsContainer, 84)});
    postCommentForm.addEventListener("submit", postYourComment);
  } else{
    const followerNames = followers.map((follower) => follower.name)
    if(followerNames.includes(API.name)){
      followBtn.innerText = "unfollow";
    }
    followBtn.setAttribute("user", name);
    followBtn.addEventListener("click", followUser);
  }
}

async function followUser(){
  const name = this.getAttribute('user');
  try{
    if(this.innerText === "follow"){
      const response = await API.followProfile(name);
      this.innerText = "unfollow";
      console.log(response)
    } else {
      const response = await API.unfollowProfile(name);
      this.innerText = "follow";
      console.log(response)
    }
  } catch(e){
    console.log(e)
  }


}

/**
 * Fills in page content with user info.
 * @param {Object} UserData
 */
function renderProfileContent({banner, avatar, name, meta = ""}){
  profileBanner.src = banner;
  profileImage.src = avatar;
  heading.innerText = name;     
  // aboutContainer.innerText = meta // awaiting extra content???
}

async function postYourComment(submit){
  submit.preventDefault();
  const title = document.querySelector("#title");
  const body = document.querySelector("#body");
  const media = document.querySelector("#media");
  const tags = document.querySelector("#tags");
  const bodyData = new newPost(title.value, body.value, media.value, tags.value);
  await postComment(API, JSON.stringify(bodyData.returnBody()))
  postCommentForm.reset()
  getUsersPosts()
}

async function getUsersPosts(API){
  const postData = await API.getPosts(); 
  const yourPosts = postData.filter(post => post.author.name === user);
  postsContainer.innerHTML= "";
  yourPosts.forEach(post => {
    postsContainer.appendChild(createBasicPost(post));
  });
}

async function createPage(){
  try{
    
    const data = await API.getProfile(user); 
    console.log(data)
    renderProfileContent(data);
    isUsersProfile(data, API);
    await getUsersPosts(API);

    data.following.forEach(following => {
      followingContainer.innerHTML += (createAvatar(following))
    })
    data.followers.forEach(follower => {
      followersContainer.innerHTML += (createAvatar(follower))
    })

  } catch(error) {
    console.log(error)
  }
};

createPage()