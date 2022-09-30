import {initialiseAPIHandler, makeAPostListener, createAPost, showInput, createAvatar, isValidImgLink, API} from "./modules/main.mjs"

//-------------------Create API handler -----------------------
//const API = initialiseAPIHandler();

//-------------------page grabs-----------------------
//post comment form
const postsContainer = document.querySelector("#post-feed");
//followers
const mightKnowContainer = document.querySelector("#you-might-know");

//------------------- New Post Form -----------------------

makeAPostListener();
//postCommentForm.addEventListener("submit", postYourComment);

//------------------- Post Feed -----------------------

async function getPosts(){
  const dataPosts = await API.getPosts(); 
  console.log(dataPosts)
  renderPosts(dataPosts);
}

function renderPosts(data){
  data.forEach(post => {
    postsContainer.appendChild(createAPost(post));
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

