import {showInput} from "../functionality/accordion.mjs"
import { API } from "../main.mjs";

export async function createNewPost(submit) {
  submit.preventDefault()
  const formData = new FormData(submit.target);
  const bodyData = Object.fromEntries(formData.entries());
  const response = await API.createPost(JSON.stringify(bodyData));
  console.log(response);
}

export function makeAPostListener(){
  //the form
  const postForm = document.querySelector("#post-comment-form");
  postForm.addEventListener("submit", createNewPost);

  //some form functionality
  const imageContainer = document.querySelector("#image-container");
  const imageBtn = document.querySelector("#img-btn");
  const tagsContainer = document.querySelector("#tags-container");
  const tagsBtn = document.querySelector("#tags-btn");
  imageBtn.addEventListener("click", function(){showInput(imageContainer, 84)});
  tagsBtn.addEventListener("click", function(){showInput(tagsContainer, 84)});  
}