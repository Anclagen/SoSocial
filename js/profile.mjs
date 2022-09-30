import {addEditProfileListeners, renderProfileContent, createBasicPost, makeAPostListener, showInput, isValidImgLink, createAvatar, API} from "./modules/main.mjs"

//-------------------page grabs-----------------------
//post comment form
const postsContainer = document.querySelector("#post-feed");
const postCommentSection = document.querySelector("#post-comment");
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
    //enables profile editing
    addEditProfileListeners();
    //enables posting to your feed.
    postCommentSection.classList.remove("hidden");
    makeAPostListener();
  } else{
    //hides the follow button for your own profile
    followContainer.classList.remove("hidden");
    //gets an array of follower names
    const followerNames = followers.map((follower) => follower.name);
    //checks if your following or not
    if(followerNames.includes(API.name)){
      followBtn.innerText = "Unfollow";
    }
    followBtn.setAttribute("user", name);
    followBtn.addEventListener("click", followUser);
  }
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
 * Gets users posts and renders them on the page.
 */
async function getUsersPosts(){
  const postData = await API.getPosts(); 
  const yourPosts = postData.filter(post => post.author.name === user);
  postsContainer.innerHTML= "";
  yourPosts.forEach(post => {
  postsContainer.appendChild(createBasicPost(post));
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