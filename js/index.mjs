import {makeAPostListener, loadPostSearch, getPostsFeed, getFollowersAddSearch} from "./modules/main.mjs"

async function createPage(){
  try{
    makeAPostListener();
    getPostsFeed();
    getFollowersAddSearch();
    loadPostSearch()
  } catch(error) {
    console.log(error)
  }
};

createPage()

