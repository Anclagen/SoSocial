import {initialiseAPIHandler, createBasicPost, createAPost, showInput, postComment, newPost, isValidImgLink, createAvatar} from "./components/main.mjs"

//-------------------Create API handler -----------------------
const API = initialiseAPIHandler();

//-------------------page grabs-----------------------
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

//-------------------Defining the profile owner-----------------------
/**
 * Checks if a query string is present to define a user.
 * @param {Class} API insert defined handleAPI class into this.
 * @returns {String} Username returned for fetch request.
 */
function defineUser(){
  let user = API.name;
  const qstring = new URLSearchParams(window.location.search);
  if(qstring.has("profile")){
    user = qstring.get("profile");
  } 
  return user
}

//defines the owner of the profile
const user = defineUser();

/**
 * Checks profile data matches logged in user to enable profile editing.
 * @param {Object} UserData a single profile object.
 */
async function initialiseProfileFunctionality({name, avatar, banner, followers}){
  //is this the logged in users profile
  if(API.name === name){
    //displays the edit button, targets inputs and assigns the event listener
    editContainer.classList.remove("hidden");
    editBtn.addEventListener("click", showProfileForm);
    //fills inputs with current values in case of only changing 1 input
    bannerInput.value = banner;
    avatarInput.value = avatar;
    editProfileForm.addEventListener("submit", updateProfile);

    //enables posting to your feed.
    postCommentSection.classList.remove("hidden");
    imageBtn.addEventListener("click", function(){showInput(imageContainer, 84)});
    tagsBtn.addEventListener("click", function(){showInput(tagsContainer, 84)});
    postCommentForm.addEventListener("submit", postYourComment);
  } else{
    //shows the follow button for your own profile
    followContainer.classList.remove("hidden");
    //gets an array of follower names
    const followerNames = followers.map((follower) => follower.name);
    //checks if 
    if(followerNames.includes(API.name)){
      followBtn.innerText = "Unfollow";
    }
    followBtn.setAttribute("user", name);
    followBtn.addEventListener("click", followUser);
  }
}

//------------------- Edit Form -----------------------
/**
 * Shows the edit form.
 */
 function showProfileForm(){
  showInput(editProfileForm, 210);
  //editBtn.classList.add("hidden");
}

/**
 * Takes the edit form and validates the image links.
 * Then posts updates to users profile images if valid.
 * Takes response to update their profile page details.
 * @param {Event} submit submission of the form
 */
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

//------------------- New Post Form -----------------------

/**
 * Posts the data from the post form,
 * then
 * @param {Event} submit 
 */
async function postYourComment(submit){
  submit.preventDefault();
  const formDate = new FormData(submit.target);
  const bodyData = Object.fromEntries(formDate.entries());
  // const title = document.querySelector("#title");
  // const body = document.querySelector("#body");
  // const media = document.querySelector("#media");
  // const tags = document.querySelector("#tags");
  // const bodyData = new newPost(title.value, body.value, media.value, tags.value);
  // const response = await postComment(API, JSON.stringify(bodyData.returnBody()))
  const response = await postComment(API, JSON.stringify(bodyData));
  console.log(response);
  postCommentForm.reset();
  getUsersPosts();
}

//------------------- Follower Btn Functionality  -----------------------

/**
 * follows or unfollows the user depending on the button state.
 */
 async function followUser(){
  try{
    if(this.innerText === "Follow"){
      await API.followProfile(user);
      this.innerText = "Unfollow";
    } else {
      await API.unfollowProfile(user);
      this.innerText = "Follow";
    }
    const newFollowers = await API.getProfile(user);
    renderFollowers(newFollowers, followersContainer, followingContainer);
  } catch(error){
    console.log(error);
  }
}


//------------------- Render and Edit html -----------------------

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

/**
 * Gets users posts and renders them on the page.
 */
async function getUsersPosts(){
  const postData = await API.getPosts(); 
  const yourPosts = postData.filter(post => post.author.name === user);
  console.log(yourPosts.map((follower) => follower.id))
  postsContainer.innerHTML= "";
  // long form version but using template is easier.
  // yourPosts.forEach(post => {
  //   postsContainer.appendChild(createBasicPost(post));
  // });
  yourPosts.forEach(post => {
  postsContainer.appendChild(createAPost(post));
  });
}

/**
 * Creates avatars and fills the follower/following containers
 * @param {*} data API profile response, takes followers/following arrays
 * @param {*} followersContainer followers output div for created avatars
 * @param {*} followingContainer following output div for created avatars
 */
function renderFollowers({following, followers}, followersContainer, followingContainer ){ //might reuse on other pages good to have containers
  followingContainer.innerHTML = "";
  followersContainer.innerHTML = "";
    following.forEach(following => {
      followingContainer.innerHTML += (createAvatar(following))
    })
    followers.forEach(follower => {
      followersContainer.innerHTML += (createAvatar(follower))
    })
}

//------------------- Page Initaliser Function -----------------------

/**
 * Calls all functions to setup the page
 */
async function createPage(){
  try{
    const data = await API.getProfile(user); 
    renderProfileContent(data);
    initialiseProfileFunctionality(data);
    renderFollowers(data, followersContainer, followingContainer);
    await getUsersPosts();

  } catch(error) {
    console.log(error)
  }
};

createPage()