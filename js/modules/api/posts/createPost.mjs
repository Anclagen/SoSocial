import {showInput} from "../../functionality/accordion.mjs"
import {API, user} from "../../main.mjs";
import {getPostsFeed, getUsersPosts} from "./getPosts.mjs";

/**
 * Creates a new post, then renders the post feed.
 * @param {Element} form the form your submitting on the page
 * @param {Function} postFunction the function to generate post feed. 
 */
export async function createNewPost(form, postFunction) {
  try{
    const errorReporting = document.querySelector("#post-comment-form-error");
    const formData = new FormData(form);
    const bodyData = Object.fromEntries(formData.entries());
    const response = await API.createPost(JSON.stringify(bodyData));
    if(response.statusCode){
      errorReporting.innerHTML = response.message;
    } else {
      errorReporting.innerHTML = "";
      form.reset();
      postFunction();
  }
  } catch (error){
    console.log(error)
    errorReporting.innerHTML = "An error error occurred when contacting the server."
  }
}

/**
 * Handles the create post form on the homepage feed.
 * @param {Event} submit form submission.
 */
function createNewPostForm(submit){
  submit.preventDefault();
  createNewPost(submit.target, getPostsFeed);
}

/**
 * Handles the create post form on the profile page feed.
 * @param {Event} submit form submission.
 */
function createNewPostFormYourProfile(submit){
  submit.preventDefault();
  function yourPost(){
    getUsersPosts(user)
  }
  createNewPost(submit.target, yourPost);
}

/**
 * Sets up the post comment form on profile and home pages.
 * @param {Boolean} boolean defaults to false, add true for profile page.
 */
export function makeAPostListener(boolean = false){
  //the form
  const postForm = document.querySelector("#post-comment-form");
  // put true in for profile page
  if(boolean){
    postForm.addEventListener("submit", createNewPostFormYourProfile);
  } else {
    //edit this to account for
    postForm.addEventListener("submit", createNewPostForm);
  }
  
  //some form functionality
  const imageContainer = document.querySelector("#image-container");
  const imageBtn = document.querySelector("#img-btn");
  const tagsContainer = document.querySelector("#tags-container");
  const tagsBtn = document.querySelector("#tags-btn");
  //hides and disables unused inputs so they don't add to post body.
  imageBtn.addEventListener("click", function(){showInput(imageContainer, 84)});
  tagsBtn.addEventListener("click", function(){showInput(tagsContainer, 84)});  
}