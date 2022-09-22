import {initialiseAPIHandler, createBasicPost, showInput, postComment, newPost} from "./components/main.mjs"
const API = initialiseAPIHandler();
//it begins!

const profileBanner = document.querySelector("#profileBanner");
const profileImage = document.querySelector("#profileImage");
const heading = document.querySelector("h1");
const editContainer = document.querySelector("#edit");
const aboutContainer = document.querySelector("#about");
const postsContainer = document.querySelector("#post-feed");
const postCommentSection = document.querySelector("#post-comment");
const postCommentForm = document.querySelector("#post-comment-form");
const editBtn = document.querySelector("#edit-btn");
const imageBtn = document.querySelector("#img-btn");
const imageContainer = document.querySelector("#image-container");
const tagsBtn = document.querySelector("#tags-btn");
const tagsContainer = document.querySelector("#tags-container");

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


/**
 * Checks profile data matches logged in user to enable profile editing.
 * @param {Object} UserData a single profile object.
 */
async function isUsersProfile({name}){
  if(API.name === name){
    editContainer.classList.remove("hidden");
    editBtn.addEventListener("click", createProfileForm);
    function createProfileForm(){
      editBtn.classList.add("hidden");
    }

    postCommentSection.classList.remove("hidden");
    imageBtn.addEventListener("click", function(){showInput(imageContainer, 84)});
    tagsBtn.addEventListener("click", function(){showInput(tagsContainer, 84)});

    async function postYourComment(submit){

      const title = document.querySelector("#title");
      const body = document.querySelector("#body");
      const media = document.querySelector("#media");
      const tags = document.querySelector("#tags");
      const bodyData = new newPost(title.value, body.value, media.value, tags.value)

      console.log(bodyData.returnBody())
      submit.preventDefault();
      console.log(await postComment(API, JSON.stringify(bodyData.returnBody())))
    }
    postCommentForm.addEventListener("submit", postYourComment)
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


(async () => {
  try{
    let user = defineUser(API);
    const data = await API.getProfile(user); 
    renderProfileContent(data);
    isUsersProfile(data);

    // Get Your Posts
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

function checkLength(input, length) {
  return input.trim().length > length;
}

console.log(checkLength("teee", 5))