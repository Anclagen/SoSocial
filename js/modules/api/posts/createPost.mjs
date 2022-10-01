import {showInput} from "../../functionality/accordion.mjs"
import { API, user} from "../../main.mjs";
import { getPosts, getUsersPosts  } from "./getPosts.mjs";

export async function createNewPost(form, postFunction) {
  const errorReporting = document.querySelector("#post-comment-form-error");
  const formData = new FormData(form);
  const bodyData = Object.fromEntries(formData.entries());
  const response = await API.createPost(JSON.stringify(bodyData));
  console.log(response)
  if(response.statusCode){
    errorReporting.innerHTML = response.message;
  } else {
    errorReporting.innerHTML = "";
    form.reset();
    postFunction();
  }
}

function createNewPostForm(submit){
  submit.preventDefault();
  createNewPost(submit.target, getPosts);
}

function createNewPostFormYourProfile(submit){
  submit.preventDefault();
  function yourPost(){
    getUsersPosts(user)
  }
  createNewPost(submit.target, yourPost);
}

export function makeAPostListener(boolean = false){
  //the form
  const postForm = document.querySelector("#post-comment-form");
  if(boolean){
    postForm.addEventListener("submit", createNewPostFormYourProfile);
  } else {
    postForm.addEventListener("submit", createNewPostForm);
  }
  
  //some form functionality
  const imageContainer = document.querySelector("#image-container");
  const imageBtn = document.querySelector("#img-btn");
  const tagsContainer = document.querySelector("#tags-container");
  const tagsBtn = document.querySelector("#tags-btn");
  imageBtn.addEventListener("click", function(){showInput(imageContainer, 84)});
  tagsBtn.addEventListener("click", function(){showInput(tagsContainer, 84)});  
}