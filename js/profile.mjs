import {initialiseAPIHandler, createBasicPost} from "./components/main.mjs"
const API = initialiseAPIHandler();
//it begins!

const profileBanner = document.querySelector("#profileBanner");
const profileImage = document.querySelector("#profileImage");
const heading = document.querySelector("h1");
const editContainer = document.querySelector("#edit");
const aboutContainer = document.querySelector("#about");
const postsContainer = document.querySelector("#post-feed");

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
  } else {

  }
  return user
}


(async () => {
  try{

    let user = defineUser(API);
    const data = await API.getProfile(user); 

    profileBanner.src = `${data.banner}`;
    profileImage.src = `${data.avatar}`;
    heading.innerText = `${data.name}`; 
    // editContainer.innerText = `${data.meta.body}` // awaiting extra content.

    if(API.name === data.name){
      console.log("build a button!");
    }

    const postData = await API.getPosts(); 
    postData.forEach(post => {
      postsContainer.appendChild(createBasicPost(post));
    });


  } catch(error) {
    console.log(error)
  }

})();