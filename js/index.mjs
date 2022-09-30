import {initialiseAPIHandler, makeAPostListener, createBasicPost, showInput, createAvatar, isValidImgLink, API} from "./modules/main.mjs"

//-------------------Create API handler -----------------------
//const API = initialiseAPIHandler();

//-------------------page grabs-----------------------
//post comment form
const postsContainer = document.querySelector("#post-feed");
const postCommentSection = document.querySelector("#post-comment");
const postCommentForm = document.querySelector("#post-comment-form");
const imageBtn = document.querySelector("#img-btn");
const imageContainer = document.querySelector("#image-container");
const tagsBtn = document.querySelector("#tags-btn");
const tagsContainer = document.querySelector("#tags-container");
//followers
const mightKnowContainer = document.querySelector("#you-might-know");

//------------------- New Post Form -----------------------
async function postYourComment(submit){
  submit.preventDefault();
  const formData = new FormData(submit.target);
  const bodyData = Object.fromEntries(formData.entries());
  const response = await API.createPost(JSON.stringify(bodyData));
  console.log(response);
  postCommentForm.reset();
  getPosts();
}

makeAPostListener();
//postCommentForm.addEventListener("submit", postYourComment);

//------------------- Post Feed -----------------------

async function getPosts(){
  const dataPosts = await API.getPosts(); 
  renderPosts(dataPosts);
}

function renderPosts(data){
  data.forEach(post => {
    postsContainer.appendChild(createBasicPost(post));
    });
}
//------------------- Followers -----------------------
//------------------- Search -----------------------
//------------------- Filter -----------------------
//------------------- Initalise Page -----------------------

async function createPage(){
  try{
    await getPosts()
   // await getFollowers()

  } catch(error) {
    console.log(error)
  }
};

createPage()

