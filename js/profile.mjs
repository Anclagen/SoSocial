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
async function isUsersProfile({name}){
  if(API.name === name){
    editContainer.classList.remove("hidden");
    editBtn.addEventListener("click", showProfileForm);
    editProfileForm.addEventListener("submit", updateProfile)

    postCommentSection.classList.remove("hidden");
    imageBtn.addEventListener("click", function(){showInput(imageContainer, 84)});
    tagsBtn.addEventListener("click", function(){showInput(tagsContainer, 84)});
    postCommentForm.addEventListener("submit", postYourComment);
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
}



(async () => {
  try{
    let user = defineUser(API);
    const data = await API.getProfile(user); 
    renderProfileContent(data);
    isUsersProfile(data);

    data.following.forEach(following => {
      followingContainer.innerHTML += (createAvatar(following))
    })
    data.followers.forEach(follower => {
      followersContainer.innerHTML += (createAvatar(follower))
    })


    // Get Your Posts, lacking enough data to use the profile posts
    const postData = await API.getPosts(); 
    const yourPosts = postData.filter(post => post.author.name === user);
    console.log(yourPosts)
    yourPosts.forEach(post => {
      postsContainer.appendChild(createBasicPost(post));
    });

    
  } catch(error) {
    console.log(error)
  }
})();