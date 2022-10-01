import {addEditProfileListeners, getUsersPosts, renderProfileContent, createAPost, makeAPostListener, followUserBtn, renderFollowers, API, user} from "./modules/main.mjs"

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
 * Checks profile data matches logged in user to enable profile editing.
 * @param {Object} UserData a single profile object.
 */
async function initialiseProfileFunctionality({name, followers}){
  //is this the logged in users profile
  if(API.name === name){
    addEditProfileListeners();
    postCommentSection.classList.remove("hidden");
    makeAPostListener(true);
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
    followBtn.addEventListener("click", followUserBtn);
  }
}

//------------------- Render and Edit html -----------------------

// /**
//  * Gets users posts and renders them on the page.
//  */
// async function getUsersPosts(){
//   const postData = await API.getPosts(); 
//   const yourPosts = postData.filter(post => post.author.name === user);
//   postsContainer.innerHTML= "";
//   yourPosts.forEach(post => {
//   postsContainer.appendChild(createAPost(post));
//   });
// }

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
    await getUsersPosts(user);

  } catch(error) {
    console.log(error)
  }
};

createPage()