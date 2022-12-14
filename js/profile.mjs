import { addEditProfileListeners, getUsersPosts, renderProfileContent, makeAPostListener, followUserBtn, renderFollowers, API, user } from "./modules/main.mjs";

//-------------------page grabs-----------------------
//post comment form
const postCommentSection = document.querySelector("#post-comment");
//followers
const followContainer = document.querySelector("#follow-user");
const followBtn = document.querySelector("#follow-btn");

//-------------------Defining the profile owner-----------------------
/**
 * Checks profile data matches logged in user to enable profile editing.
 * or if another users profile enables following/unfollowing
 * @param {Object} UserData a single profile object.
 */
async function initialiseProfileFunctionality({ name, followers }) {
  //is this the logged in users profile
  if (API.name === name) {
    addEditProfileListeners();
    postCommentSection.classList.remove("hidden");
    makeAPostListener(true);
  } else {
    //hides the follow button for your own profile
    followContainer.classList.remove("hidden");
    //gets an array of follower names
    const followerNames = followers.map((follower) => follower.name);
    //checks if your following or not
    if (followerNames.includes(API.name)) {
      followBtn.innerText = "Unfollow";
    }
    followBtn.setAttribute("user", name);
    followBtn.addEventListener("click", followUserBtn);
  }
}

//------------------- Page Initaliser Function -----------------------
/**
 * Calls all functions to setup the page
 */
async function createPage() {
  if (API) {
    try {
      const data = await API.getProfile(user);
      renderProfileContent(data);
      initialiseProfileFunctionality(data);
      renderFollowers(data);
      await getUsersPosts(user);
    } catch (error) {
      console.log(error);
    }
  }
}

createPage();
