import {makeAPostListener, createAPost, getPosts, API} from "./modules/main.mjs"

//-------------------page grabs-----------------------
//post comment form
const postsContainer = document.querySelector("#post-feed");
//followers
const mightKnowContainer = document.querySelector("#you-might-know");

async function createPage(){
  try{
    makeAPostListener();
    await getPosts()
   // await getFollowers()

  } catch(error) {
    console.log(error)
  }
};
createPage()

